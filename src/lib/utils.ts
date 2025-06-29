import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getProjectYearOptions(gens: number[]): string[] {
    return ["전체", ...gens.map((g) => `${g}기`)];
}

export function labelToGeneration(label: string): number | null {
    return label === "전체" ? null : parseInt(label.replace("기", ""), 10);
}

export function generationToLabel(generation?: number): string {
    return generation === undefined || generation === null ? "전체" : `${generation}기`;
}
