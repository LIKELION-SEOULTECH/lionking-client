import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
    "sub4_sb inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-1 focus-visible:ring-ring/50 transition-all",
    {
        variants: {
            color: {
                neutral: "text-gray-3 border border-gray-3 hover:bg-gray-6",
                orange: "text-orange-main border border-orange-main border-1 hover:bg-gray-6",
                destructive: "text-red-500 border border-red-400/50 hover:bg-gray-6",
                primary: "text-white bg-neutral-800 hover:bg-neutral-900 border border-neutral-800",
                ghost: "text-neutral-500 border-none hover:bg-gray-6",
            },
            padding: {
                sm: "px-3 py-1",
                md: "px-3.5 py-1.5 subtitle-4",
                lg: "px-5 py-2",
            },
            round: {
                sm: "rounded-sm", // 4px
                md: "rounded-md", // 6px
                lg: "rounded-lg", // 8px
                pill: "rounded-full",
            },
        },
        defaultVariants: {
            color: "primary",
            padding: "md",
            round: "md",
        },
    }
);

export default function Button({
    className,
    color,
    padding = "md",
    round = "lg",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ color, padding, round, className }))}
            {...props}
        />
    );
}
