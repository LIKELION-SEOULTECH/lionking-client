import { Member, positionEnumToLabel, roleEnumToLabel, User } from "@/types";
import { Parts, Role } from "@/types";

export function memberMapper(data: User): Member {
    return {
        id: data.memberId,
        name: data.username,
        major: data.department ?? undefined,
        position: data.position as Parts,
        positionLabel: positionEnumToLabel[data.position as Parts],
        role: data.role as Role,
        roleLabel: roleEnumToLabel[data.role as Role],
        imageUrl: data.profileImage ?? undefined,
        userTags: [roleEnumToLabel[data.role as Role], data.position].filter(Boolean),
        profileIntro: data.description ?? undefined,
        profileIntroTags: data.descriptionTag
            ? data.descriptionTag.split(",").map((tag: string) => tag.trim().replace(/^#/, ""))
            : [],
        profileIntroSkills: data.techStack
            ? data.techStack.split(",").map((s: string) => s.trim())
            : [],
        profileExternalLinks: data.portfolioUrls
            ? data.portfolioUrls
                  .split(",")
                  .map((entry: string) => entry.trim())
                  .filter(Boolean)
                  .map((entry: string) => {
                      const [label, url] = entry.split(":").map((s) => s.trim());
                      return { label, url };
                  })
            : [],
    };
}
