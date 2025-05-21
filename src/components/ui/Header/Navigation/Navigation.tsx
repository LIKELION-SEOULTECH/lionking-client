"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { navigationLinks } from "./navigationLinks";

export default function Navigation() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    const isActiveClass = (href: string) => (isActive(href) ? "text-lion-orange" : "text-gray-2");

    return (
        /* Design Spec:
            - Navigation item gap: 40px (used gap-10 for tailwind)
            - Navigation item text style: subtitle-3
            - Default color: gray-2
            - Hover color: orainge-main
         */
        <nav className="flex gap-10" role="navigation" aria-label="사이트 내비게이션">
            {navigationLinks.map(({ label, key, href }) => (
                <Link
                    key={key}
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cn(
                        "subtitle-3 transition-colors",
                        isActiveClass(href),
                        "hover:text-orange-main",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
