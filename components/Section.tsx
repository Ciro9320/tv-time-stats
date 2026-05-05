import { ReactNode } from "react";

type SectionProps = {
    title: string;
    className?: string;
    children: ReactNode;
    action?: ReactNode;
};

export default function Section({
    title,
    className,
    children,
    action,
}: SectionProps) {
    return (
        <section className={`${className} mt-8`}>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    {title}
                </h2>

                {action && <div> {action} </div>}
            </div>

            {children}
        </section>
    );
}
