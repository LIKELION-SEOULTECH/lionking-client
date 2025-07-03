"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navigationLinks } from "../navigationLinks";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Navigation() {
    const pathname = usePathname();

    function isExact(path: string, href: string) {
        return path === href;
    }

    function isSubPath(path: string, base: string) {
        return path.startsWith(base + "/");
    }

    function isPathMatching(path: string, hrefs: string[]) {
        return hrefs.some((href) => path === href || isSubPath(path, href));
    }

    function getActiveClass(path: string, href: string, fallback: string = "text-gray-2") {
        return isExact(path, href) ? "text-orange-main" : fallback;
    }

    return (
        <NavigationMenu.Root className="relative z-50 flex items-center" delayDuration={0}>
            <NavigationMenu.List className="flex gap-0 items-center">
                {navigationLinks.map((item) => {
                    const isParentActive = item.href && isPathMatching(pathname, [item.href]);
                    const isAnyChildActive =
                        item.children &&
                        isPathMatching(
                            pathname,
                            item.children.map((c) => c.href)
                        );
                    const isTriggerActive = isParentActive || isAnyChildActive;

                    if (item.children) {
                        return (
                            <NavigationMenu.Item key={item.key} className="relative">
                                <NavigationMenu.Trigger
                                    className={cn(
                                        "sub3_sb hover:text-orange-main transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main py-5 px-5",
                                        isTriggerActive ? "text-orange-main" : "text-gray-2"
                                    )}
                                >
                                    <Link href={item.href!} className="w-full h-full">
                                        {item.label}
                                    </Link>
                                </NavigationMenu.Trigger>

                                <NavigationMenu.Content className="absolute top-full left-0 mt-2 rounded-[8px] bg-gray-6 p-4 animate-in fade-in zoom-in-95 min-w-[150px]">
                                    <ul className="w-full flex flex-col gap-3">
                                        {item.children.map((child) => (
                                            <li key={child.key}>
                                                <Link
                                                    href={child.href}
                                                    aria-current={
                                                        isExact(pathname, child.href)
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    className={cn(
                                                        "relative sub3_sb transition-colors",
                                                        getActiveClass(
                                                            pathname,
                                                            child.href,
                                                            "text-gray-1"
                                                        ),
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
                        );
                    }

                    return (
                        <NavigationMenu.Item key={item.key}>
                            <NavigationMenu.Link asChild>
                                <Link
                                    href={item.href!}
                                    aria-current={
                                        isExact(pathname, item.href!) ? "page" : undefined
                                    }
                                    className={cn(
                                        "sub3_sb transition-colors hover:text-orange-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main py-5 px-5",
                                        getActiveClass(pathname, item.href!)
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    );
                })}
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}
