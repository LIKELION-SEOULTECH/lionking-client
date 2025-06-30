import { AuthMeResponse, authVerifyMapper } from "@/lib/api/mappers/auth.mapper";
import { Member } from "@/types";
import { useEffect, useState } from "react";

type UseAuthResult = {
    isAuthenticated: boolean;
    loading: boolean;
    user?: Member;
    error?: string;
};

export function useAuth(): UseAuthResult {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Member>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                });

                if (!res.ok) {
                    const err = await res.json();
                    setIsAuthenticated(false);
                    setError(err.message || "인증 실패");
                } else {
                    const data = await res.json();
                    const user = data.data as AuthMeResponse;
                    setIsAuthenticated(user !== null);
                    const mappedUser = authVerifyMapper(user);
                    setUser(mappedUser);
                }
            } catch {
                setIsAuthenticated(false);
                setError("네트워크 오류");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, user, loading, error };
}
