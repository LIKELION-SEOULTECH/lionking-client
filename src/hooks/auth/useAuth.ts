import { AuthMeResponse, authVerifyMapper } from "@/lib/api/mappers/auth.mapper";
import { Member } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    const [user, setUser] = useState<Member | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me", { method: "GET" });
                if (!res.ok) {
                    throw new Error((await res.json()).message || "인증 실패");
                }

                const data = await res.json();
                const user = data.data as AuthMeResponse;
                setUser(authVerifyMapper(user));
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
                if (options?.redirectTo) {
                    router.replace(options.redirectTo);
                }
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error, isAuthenticated };
}
