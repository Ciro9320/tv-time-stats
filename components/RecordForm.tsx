"use client";

import { useState } from "react";
import { insertRecordAction, updateRecordAction } from "@/app/actions";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import ServerIcon from "@heroicons/react/24/outline/ServerIcon";

type RecordData = {
    id: number;
    year: number;
    month: number;
    episodes: number;
    hours: number;
    generated: number | boolean;
};

export default function RecordForm({
    initialData,
}: {
    initialData?: RecordData;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const isEditing = !!initialData;

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(event.currentTarget);

        const result = isEditing
            ? await updateRecordAction(formData)
            : await insertRecordAction(formData);

        if (result?.error) {
            setError(result.error);
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10"
            onSubmit={handleSubmit}
        >
            {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    {error}
                </div>
            )}

            {isEditing && (
                <input type="hidden" name="id" value={initialData.id} />
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="year"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Year
                    </label>
                    <input
                        required
                        type="number"
                        id="year"
                        name="year"
                        defaultValue={
                            initialData?.year || new Date().getFullYear()
                        }
                        disabled={isEditing}
                        className="mt-2 block w-full rounded-lg border-0 py-2 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 transition focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400"
                    />
                </div>

                <div>
                    <label
                        htmlFor="month"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Month
                    </label>
                    <select
                        required
                        id="month"
                        name="month"
                        defaultValue={
                            initialData?.month || new Date().getMonth()
                        }
                        disabled={isEditing}
                        className="mt-2 block w-full rounded-lg border-0 py-2 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 transition focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400"
                    >
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="episodes"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Episodes
                    </label>
                    <input
                        required
                        type="number"
                        id="episodes"
                        name="episodes"
                        min="0"
                        defaultValue={initialData?.episodes}
                        className="mt-2 block w-full rounded-lg border-0 py-2 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 transition focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="hours"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Hours
                    </label>
                    <input
                        required
                        type="number"
                        id="hours"
                        name="hours"
                        min="0"
                        defaultValue={initialData?.hours}
                        className="mt-2 block w-full rounded-lg border-0 py-2 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 transition focus:outline-none"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="generated"
                        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Generated
                    </label>
                    <select
                        required
                        id="generated"
                        name="generated"
                        defaultValue={
                            initialData
                                ? initialData.generated
                                    ? "1"
                                    : "0"
                                : "0"
                        }
                        className="mt-2 block w-full rounded-lg border-0 py-2 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 transition focus:outline-none"
                    >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {isSubmitting ? (
                        <>
                            <ArrowPathIcon className="h-5 w-5 animate-spin mr-1" />
                            {isEditing ? "Updating..." : "Saving..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? (
                                <ServerIcon className="h-5 w-5 mr-1" />
                            ) : (
                                <PlusIcon className="h-5 w-5 mr-1" />
                            )}
                            {isEditing ? "Update Record" : "Add Record"}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
