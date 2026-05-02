type HeaderProps = {
    title: string;
    subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                {title}
            </h1>
            <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
                {subtitle}
            </p>
        </header>
    );
}
