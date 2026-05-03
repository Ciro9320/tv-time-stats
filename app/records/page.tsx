import pool from "@/lib/db";
import Header from "@/components/Header";
import Section from "@/components/Section";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import DeleteRecordModal from "@/components/DeleteRecordModal";

export const dynamic = "force-dynamic";

export default async function RecordsPage() {
    const [records] = await pool.query(
        "SELECT * FROM stats ORDER BY year DESC, month DESC",
    );

    return (
        <div>
            <Header
                title="Records"
                subtitle="Browse, edit, and manage all your monthly entries."
            />

            <Section
                title="All Records"
                action={
                    <Link
                        className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
                        href="/records/new"
                    >
                        <PlusIcon className="h-5 w-5" /> Add New Record
                    </Link>
                }
            >
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-zinc-50 border-b border-zinc-200 dark:bg-zinc-800/80 dark:border-zinc-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Year - Month
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Total Episodes
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Total Hours
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                        Generated
                                    </th>
                                    <th className="px-6 py-4 relative">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {(records as any[]).map((row) => (
                                    <tr
                                        key={row.id}
                                        className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                                    >
                                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                                            {row.year} - {row.month}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {row.episodes}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {row.hours}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                            {row.generated ? (
                                                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20">
                                                    No
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex justify-end gap-4">
                                                <Link
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition"
                                                    href={`/records/${row.id}/edit`}
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                    Edit
                                                </Link>
                                                <DeleteRecordModal
                                                    id={row.id}
                                                />
                                            </div>
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
