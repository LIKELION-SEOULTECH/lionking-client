import { VariantProps } from "class-variance-authority";
import { ProfileCardVariants } from "./ProfileCardVariants";

export type ProfileCardInformations = {
    name: string;
    major?: string;
    userTags?: string[];
};

export type ProfileCardProps = ProfileCardInformations & VariantProps<typeof ProfileCardVariants>;

export type ProfileCardInfoProps = ProfileCardInformations &
    VariantProps<typeof ProfileCardVariants>;
