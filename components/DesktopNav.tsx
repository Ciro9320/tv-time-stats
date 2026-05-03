"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";

type NavProps = {
    links: {
        name: string;
        href: string;
    }[];
};

export default function DesktopNav({ links }: NavProps) {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);
    const isSubPage = pathSegments.length > 1;
    const isDeepRecordPage =
        pathSegments[0] === "records" && pathSegments.length > 1;
    const backLink = isDeepRecordPage
        ? "/records"
        : "/" + pathSegments.slice(0, -1).join("/");

    return (
        <div className="hidden md:flex sticky top-4 z-50 w-full justify-center mt-4 px-4 sm:px-6 lg:px-8">
            <nav className="pointer-events-auto relative flex flex-row justify-center items-center w-full">
                <div className="absolute left-0">
                    {isSubPage && (
                        <Link
                            href={backLink}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 bg-white/70 backdrop-blur-sm dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-white/10 transition"
                        >
                            <ChevronLeftIcon className="h-5 w-5 ml-[-3px]" />
                        </Link>
                    )}
                </div>

                <ul className="flex rounded-full px-3 text-sm font-semibold text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 bg-white/70 backdrop-blur-sm dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-white/10">
                    {links.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);

                        return (
                            <li key={link.name}>
                                <Link
                                    className={`relative block px-3 py-2 transition hover:text-indigo-500 dark:hover:text-indigo-400 ${isActive ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-800 dark:text-zinc-200"}`}
                                    href={link.href}
                                >
                                    {link.name}

                                    {isActive ? (
                                        <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 dark:from-indigo-400/0 dark:via-indigo-400/40 dark:to-indigo-400/0"></span>
                                    ) : null}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
