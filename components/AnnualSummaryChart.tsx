"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Legend, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    episodes: {
        label: "Episodes",
        color: "oklch(58.5% 0.233 277.117)",
    },
    hours: {
        label: "Hours",
        color: "oklch(70.5% 0.015 286.067)",
    },
} satisfies ChartConfig;

type AnnualData = {
    year: string;
    episodes: number;
    hours: number;
};

export default function AnnualSummaryChart({ data }: { data: AnnualData[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
                data={data}
                margin={{ top: 20, right: 10, bottom: 0, left: 10 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    className="stroke-zinc-200 dark:stroke-zinc-800"
                />

                <XAxis
                    dataKey="year"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={{
                        fill: "currentColor",
                        className: "fill-zinc-600 dark:fill-zinc-400",
                    }}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                        fill: "currentColor",
                        className: "fill-zinc-600 dark:fill-zinc-400",
                    }}
                />

                <ChartTooltip
                    cursor={{
                        fill: "var(--color-border)",
                        opacity: 0.1,
                    }}
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            labelClassName="text-zinc-900 font-bold"
                        />
                    }
                />

                <Legend verticalAlign="top" iconType="circle" />

                <Bar
                    dataKey="episodes"
                    fill="var(--color-episodes)"
                    radius={[5, 5, 0, 0]}
                />
                <Bar
                    dataKey="hours"
                    fill="var(--color-hours)"
                    radius={[5, 5, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    );
}
