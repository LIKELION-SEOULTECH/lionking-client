import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthMeResponse, authVerifyMapper } from "@/lib/api/mappers/auth.mapper";
import { Member } from "@/types";

type UseAuthResult = {
    isAuthenticated: boolean;
    loading: boolean;
    user?: Member;
    error?: string;
};

type UseAuthOptions = {
    redirectTo?: string;
};

export function useAuth(options?: UseAuthOptions): UseAuthResult {
    const [user, setUser] = useState<Member>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const controller = new AbortController();

        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    signal: controller.signal,
                });

                const result = await res.json().catch(() => null);

                if (!res.ok || !result?.data) {
                    throw new Error(result?.message || "인증 실패");
                }

                const mappedUser = authVerifyMapper(result.data as AuthMeResponse);

                setUser(mappedUser);
                setIsAuthenticated(true);
            } catch (err) {
                if (!controller.signal.aborted) {
                    setIsAuthenticated(false);
                    setError((err as Error).message);
                    if (options?.redirectTo) {
                        router.replace(options.redirectTo);
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            controller.abort();
        };
    }, [options?.redirectTo, router]);

    return { user, loading, error, isAuthenticated };
}
