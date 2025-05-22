"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navigationLinks } from "./navigationLinks";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Navigation() {
    const pathname = usePathname();
    function isActive(pathname: string, href: string) {
        return pathname === href;
    }
    function isActiveClass(href: string, pathname: string) {
        return isActive(pathname, href) ? "text-orange-main" : "text-gray-1";
    }

    return (
        <NavigationMenu.Root className="relative z-50 flex items-center" delayDuration={0}>
            <NavigationMenu.List className="flex gap-10 items-center">
                {navigationLinks.map((item) =>
                    item.children ? (
                        <NavigationMenu.Item key={item.key} className="relative">
                            <NavigationMenu.Trigger className="sub3_sb text-gray-2 hover:text-orange-main transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main">
                                {item.label}
                            </NavigationMenu.Trigger>

                            <NavigationMenu.Content className="absolute top-full left-0 mt-1 rounded-[8px] bg-gray-7 p-4 animate-in fade-in zoom-in-95 min-w-[150px]">
                                <ul className="w-full flex flex-col gap-3">
                                    {item.children.map((child) => (
                                        <li key={child.key}>
                                            <Link
                                                href={child.href}
                                                aria-current={
                                                    isActive(child.href, pathname)
                                                        ? "page"
                                                        : undefined
                                                }
                                                className={cn(
                                                    "relative sub3_sb transition-colors",
                                                    isActiveClass(child.href, pathname),
                                                    "hover:text-orange-main",
                                                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main"
                                                )}
                                            >
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                    ) : (
                        <NavigationMenu.Item key={item.key}>
                            <NavigationMenu.Link asChild>
                                <Link
                                    href={item.href!}
                                    aria-current={
                                        isActive(item.href!, pathname) ? "page" : undefined
                                    }
                                    className={cn(
                                        "sub3_sb transition-colors",
                                        isActiveClass(item.href!, pathname),
                                        "hover:text-orange-main",
                                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    )
                )}
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}
