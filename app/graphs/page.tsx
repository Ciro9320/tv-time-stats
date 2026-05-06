import pool from "@/lib/db";
import Header from "@/components/Header";
import Section from "@/components/Section";
import ReliabilityChart from "@/components/ReliabilityChart";
import AnnualSummaryChart from "@/components/AnnualSummaryChart";
import TrendChart from "@/components/TrendChart";
import MonthlyHoursChart from "@/components/MonthlyHoursChart";
import MonthlyEpisodesChart from "@/components/MonthlyEpisodesChart";
import RatioChart from "@/components/RadioChart";
import SeasonalityChart from "@/components/SeasonalityChart";
import TopMonthsChart from "@/components/TopMonthsChart";
import LifetimeStats from "@/components/LifetimeStats";

export const dynamic = "force-dynamic";

export default async function GraphsPage() {
    const [annualRows] = await pool.query(
        "SELECT year, SUM(episodes) as total_episodes, SUM(hours) as total_hours FROM stats GROUP BY year ORDER BY year ASC",
    );
    const annualData = (annualRows as any[]).map((row) => ({
        year: row.year.toString(),
        episodes: Number(row.total_episodes || 0),
        hours: Number(parseFloat(row.total_hours || 0).toFixed(2)),
    }));

    const [reliabilityRows] = await pool.query(
        "SELECT generated, SUM(hours) as total_hours FROM stats GROUP BY generated",
    );
    const reliabilityData = (reliabilityRows as any[]).map((row) => ({
        name: row.generated === 0 ? "Real" : "Generated",
        value: parseFloat(row.total_hours || 0),
        fill:
            row.generated === 0
                ? "var(--color-real)"
                : "var(--color-generated)",
    }));

    const [trendRows] = await pool.query(
        "SELECT year, month, SUM(episodes) as total_episodes, SUM(hours) as total_hours FROM stats GROUP BY year, month ORDER BY year ASC, month ASC",
    );
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const trendData = (trendRows as any[]).map((row) => ({
        date: `${monthNames[row.month - 1]} ${row.year}`,
        episodes: Number(row.total_episodes || 0),
        hours: Number(parseFloat(row.total_hours || 0).toFixed(2)),
    }));
    const ratioData = trendData.map((row) => {
        const averageMinutes =
            row.episodes > 0 ? (row.hours / row.episodes) * 60 : 0;

        return {
            date: row.date,
            average: Math.round(averageMinutes),
        };
    });

    const [monthlyRows] = await pool.query(
        "SELECT year, month, SUM(hours) as total_hours, SUM(episodes) as total_episodes FROM stats GROUP BY year, month ORDER BY month ASC, year ASC",
    );
    const uniqueYears = Array.from(
        new Set((monthlyRows as any[]).map((row) => row.year.toString())),
    ).sort();
    const monthlyHoursData = monthNames.map((m) => {
        const obj: any = { month: m };
        uniqueYears.forEach((y) => (obj[y] = 0));
        return obj;
    });
    const monthlyEpisodesData = monthNames.map((m) => {
        const obj: any = { month: m };
        uniqueYears.forEach((y) => (obj[y] = 0));
        return obj;
    });
    (monthlyRows as any[]).forEach((row) => {
        const monthIndex = row.month - 1;
        const yearStr = row.year.toString();

        monthlyHoursData[monthIndex][yearStr] = Number(
            parseFloat(row.total_hours || 0).toFixed(2),
        );
        monthlyEpisodesData[monthIndex][yearStr] = Number(
            row.total_episodes || 0,
        );
    });

    const seasonalityData = [
        { season: "Winter", hours: 0 }, // December, January, February
        { season: "Spring", hours: 0 }, // March, April, May
        { season: "Summer", hours: 0 }, // June, July, August
        { season: "Autumn", hours: 0 }, // September, October, November
    ];
    (monthlyRows as any[]).forEach((row) => {
        const m = row.month;
        const hrs = Number(parseFloat(row.total_hours || 0));

        if (m === 12 || m === 1 || m === 2) {
            seasonalityData[0].hours += hrs;
        } else if (m >= 3 && m <= 5) {
            seasonalityData[1].hours += hrs;
        } else if (m >= 6 && m <= 8) {
            seasonalityData[2].hours += hrs;
        } else if (m >= 9 && m <= 11) {
            seasonalityData[3].hours += hrs;
        }
    });
    seasonalityData.forEach((s) => (s.hours = Number(s.hours.toFixed(0))));

    const [topMonthsRows] = await pool.query(
        "SELECT year, month, hours FROM stats ORDER BY hours DESC LIMIT 5",
    );
    const topMonthsData = (topMonthsRows as any[]).map((row) => ({
        label: `${monthNames[row.month - 1]} '${row.year.toString().slice(2)}`,
        hours: Number(parseFloat(row.hours || 0).toFixed(0)),
    }));

    const totalHoursEver = (annualRows as any[]).reduce(
        (acc, row) => acc + parseFloat(row.total_hours || 0),
        0,
    );
    const totalEpisodesEver = (annualRows as any[]).reduce(
        (acc, row) => acc + Number(row.total_episodes || 0),
        0,
    );
    const totalDaysEver = (totalHoursEver / 24).toFixed(1);

    return (
        <div>
            <Header
                title="Graphs"
                subtitle="Visualize your viewing habits and discover trends."
            />

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Section title="Lifetime Stats" className="lg:col-span-1">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-48 md:h-72 w-full items-center justify-center">
                        <LifetimeStats
                            hours={totalHoursEver}
                            days={totalDaysEver}
                            episodes={totalEpisodesEver}
                        />
                    </div>
                </Section>

                <Section title="Annual Summary" className="lg:col-span-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-72 w-full items-center justify-center">
                        <AnnualSummaryChart data={annualData} />
                    </div>
                </Section>

                <Section title="Historic trends" className="lg:col-span-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-72 w-full items-center justify-center">
                        <TrendChart data={trendData} />
                    </div>
                </Section>

                <Section
                    title="Monthly hours comparison"
                    className="lg:col-span-3"
                >
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-96 w-full items-center justify-center">
                        <MonthlyHoursChart
                            data={monthlyHoursData}
                            years={uniqueYears}
                        />
                    </div>
                </Section>

                <Section
                    title="Monthly episodes comparison"
                    className="lg:col-span-3"
                >
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-96 w-full items-center justify-center">
                        <MonthlyEpisodesChart
                            data={monthlyEpisodesData}
                            years={uniqueYears}
                        />
                    </div>
                </Section>

                <Section title="Binge-Watching Ratio" className="lg:col-span-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-72 w-full items-center justify-center">
                        <RatioChart data={ratioData} />
                    </div>
                </Section>

                <Section title="Seasonality" className="lg:col-span-1">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-72 w-full items-center justify-center">
                        <SeasonalityChart data={seasonalityData} />
                    </div>
                </Section>

                <Section title="Hall of Fame (Top 5)" className="lg:col-span-1">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-72 w-full items-center justify-center">
                        <TopMonthsChart data={topMonthsData} />
                    </div>
                </Section>

                <Section title="Data accuracy" className="lg:col-span-1">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10 flex h-72 w-full items-center justify-center">
                        <ReliabilityChart data={reliabilityData} />
                    </div>
                </Section>
            </div>
        </div>
    );
}
