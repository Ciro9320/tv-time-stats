import { ReactNode } from "react";

type SectionProps = {
    title: string;
    children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
    return (
        <section className="mt-12 first:mt-8">
            <h2 className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                {title}
            </h2>

            {children}
        </section>
    );
}
