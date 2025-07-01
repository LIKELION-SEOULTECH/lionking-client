import { Member, Parts, Role, roleEnumToLabel, User } from "@/types";

export type AuthMeResponse = {
    id: number;
    name: string;
    department: string | null;
    position: string;
    role: string;
    generation: number;
};

export function authVerifyMapper(data: AuthMeResponse): Member {
    return {
        id: data.id,
        name: data.name,
        major: data.department ?? undefined,
        position: data.position as Parts,
        role: data.role as Role,
        roleLabel: roleEnumToLabel[data.role as Role],
        generation: data.generation,
        imageUrl: undefined,
        userTags: [data.role, data.position].filter(Boolean),
        profileIntro: undefined,
        profileIntroTags: [],
        profileIntroSkills: "",
        profileExternalLinks: [],
    };
}
