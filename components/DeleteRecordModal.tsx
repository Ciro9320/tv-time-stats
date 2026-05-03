"use client";

import { useState } from "react";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { deleteRecordAction } from "@/app/actions";

export default function DeleteRecordModal({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        const result = await deleteRecordAction(id);

        setIsDeleting(false);

        if (result.success) {
            setIsOpen(false);
        } else {
            alert(result.error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition"
            >
                <TrashIcon className="h-5 w-5" /> Delete
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity dark:bg-black/50"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="relative z-10 w-full max-w-md transform overflow-hidden whitespace-normal rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-800 dark:ring-1 dark:ring-white/10">
                        <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                            Delete Record
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Are you sure you want to delete this record?
                                This action cannot be undone and will remove the
                                statistics for this month.
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
