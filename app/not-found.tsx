import Link from "next/link";
import ArrowTurnDownLeftIcon from "@heroicons/react/24/outline/ArrowTurnDownLeftIcon";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center mt-24">
            <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
                404
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                Page not found
            </h1>

            <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400 max-w-md">
                Sorry, we couldn't find the page you were looking for. It may
                have been deleted or the address may be incorrect.
            </p>

            <div className="mt-4 flex items-center justify-center gap-x-6">
                <Link
                    className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
                    href="/"
                >
                    <ArrowTurnDownLeftIcon className="h-5 w-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
