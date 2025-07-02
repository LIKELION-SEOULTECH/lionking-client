import { Member, positionEnumToLabel, roleEnumToLabel, User } from "@/types";
import { Parts, Role } from "@/types";

export function memberMapper(data: User): Member {
    /* ───────────────────────────── 추가: "USER" → "MEMBER"(아기사자) 치환 */
    const normalizedRole = (data.role === "USER" ? "MEMBER" : data.role) as Role;

    return {
        id: data.memberId,
        name: data.username,
        major: data.department ?? undefined,
        position: data.position as Parts,
        positionLabel: positionEnumToLabel[data.position as Parts],
        role: normalizedRole, // ← 치환 결과 사용
        roleLabel: roleEnumToLabel[normalizedRole], // ← 라벨도 치환
        imageUrl: data.profileImage ?? undefined,
        userTags: [roleEnumToLabel[normalizedRole], data.position].filter(Boolean),
        profileIntro: data.description ?? undefined,
        profileIntroTags: data.descriptionTag
            ? data.descriptionTag.split(",").map((tag: string) => tag.trim().replace(/^#/, ""))
            : [],
        profileIntroSkills: data.techStack ?? "",
        profileExternalLinks: data.portfolioUrls
            ? data.portfolioUrls
                  .split(",")
                  .map((entry: string) => entry.trim())
                  .filter((entry) => entry && entry.includes(":"))
                  .map((entry: string) => {
                      const [type, ...urlParts] = entry.split(":").map((s) => s.trim());
                      return { type, url: urlParts.join(":") };
                  })
            : [],
    };
}
