import pool from "@/lib/db";
import Header from "@/components/Header";
import Section from "@/components/Section";

export default async function Home() {
    const [all_time_stats_result] = await pool.query(
        "SELECT * FROM stats_all_time_view",
    );
    const all_time_stats = (all_time_stats_result as any)[0];

    const [by_year_stats] = await pool.query(
        "SELECT * FROM stats_by_year_view",
    );

    if (!all_time_stats || !by_year_stats) {
        return (
            <div>
                <Header
                    title="TV Time Stats"
                    subtitle="Your All-Time summary and annual analysis."
                />
                <p>No data found.</p>
            </div>
        );
    }

    const StatBox = ({
        title,
        value,
        subtitle,
    }: {
        title: string;
        value: string | number;
        subtitle?: string;
    }) => (
        <div className="flex flex-col justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {title}
            </h3>
            <div className="flex flex-row justify-start items-end gap-2">
                <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {value}
                </p>
                {subtitle && (
                    <p className="mt-1 text-sm text-indigo-500 dark:text-indigo-400">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <div>
            <Header
                title="TV Time Stats"
                subtitle="Your All-Time summary and annual analysis."
            />

            <Section title="All-Time Overview">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatBox
                        title="Total Episodes Watched"
                        value={all_time_stats["Total Episodes"]}
                    />
                    <StatBox
                        title="Total Hours Watched"
                        value={all_time_stats["Total Hours"]}
                    />
                    <StatBox
                        title="Monthly Average Episodes"
                        value={Number(
                            all_time_stats["Average Episodes"],
                        ).toFixed(1)}
                    />
                    <StatBox
                        title="Monthly Average Hours"
                        value={Number(all_time_stats["Average Hours"]).toFixed(
                            1,
                        )}
                    />
                    <StatBox
                        title="Monthly Record Episodes"
                        value={all_time_stats["Max Episodes Value"]}
                        subtitle={all_time_stats["Month Max Episodes"]}
                    />
                    <StatBox
                        title="Monthly Record Hours"
                        value={all_time_stats["Max Hours Value"]}
                        subtitle={all_time_stats["Month Max Hours"]}
                    />
                    <StatBox
                        title="Total Recorded Months"
                        value={all_time_stats["Total Recorded Months"]}
                        subtitle={`${all_time_stats["Total Generated Months"]} estimated months`}
                    />
                </div>
            </Section>

            <Section title="Annual Summary">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-zinc-50 border-b border-zinc-200 dark:bg-zinc-800/80 dark:border-zinc-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Year
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Total Episodes
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Total Hours
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Average Episodes
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Average Hours
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Months Recorded
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {(by_year_stats as any[]).map((row) => (
                                    <tr
                                        key={row["Year"]}
                                        className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                                    >
                                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                                            {row["Year"]}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {row["Total Episodes"]}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {row["Total Hours"]}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {Number(
                                                row["Total Average Episodes"],
                                            ).toFixed(1)}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {Number(
                                                row["Total Average Hours"],
                                            ).toFixed(1)}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {row["Total Recorded Months"]} / 12
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </div>
    );
}
