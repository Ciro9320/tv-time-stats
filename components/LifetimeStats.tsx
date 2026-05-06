export default function LifetimeStats({
    hours,
    days,
    episodes,
}: {
    hours: number;
    days: string;
    episodes: number;
}) {
    return (
        <div className="flex h-full w-full flex-col justify-center gap-6">
            <div>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 md:text-lg">
                    Total Life Wasted
                </p>
                <p className="mt-1 text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 md:text-7xl">
                    {days}{" "}
                    <span className="text-base font-semibold text-zinc-500 dark:text-zinc-400 md:text-xl">
                        days
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 md:text-lg">
                        Total Episodes
                    </p>
                    <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
                        {episodes}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 md:text-lg">
                        Total Hours
                    </p>
                    <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
                        {hours.toFixed(0)}
                    </p>
                </div>
            </div>
        </div>
    );
}
