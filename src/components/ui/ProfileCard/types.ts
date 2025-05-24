import { VariantProps } from "class-variance-authority";
import { ProfileCardVariants } from "./ProfileCardVariants";
import { Member } from "@/types";

export type ProfileCardInformations = {
    member: Member;
};

export type ProfileCardProps = ProfileCardInformations & VariantProps<typeof ProfileCardVariants>;

export type ProfileCardInfoProps = ProfileCardInformations &
    VariantProps<typeof ProfileCardVariants>;
