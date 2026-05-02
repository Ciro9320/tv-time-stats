"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavProps = {
    links: {
        name: string;
        href: string;
    }[];
};

export default function MobileNav({ links }: NavProps) {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex w-full justify-center mb-4">
            <nav className="pointer-events-auto">
                <ul className="flex rounded-full px-3 text-base font-semibold text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 bg-white/70 backdrop-blur-sm dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-white/10">
                    {links.map((link) => {
                        const isActive = pathname === link.href;

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
