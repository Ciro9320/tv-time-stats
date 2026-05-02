export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-zinc-100 pb-24 md:pb-16 pt-10 dark:border-zinc-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Made with ❤️ by Ciro9320.
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        &copy; {currentYear} tv-time-stats. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
