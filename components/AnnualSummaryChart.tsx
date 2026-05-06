"use client";

import { useState } from "react";
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
    const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    const handleLegendClick = (e: any) => {
        const keyClicked = e.dataKey;
        if (hiddenSeries.includes(keyClicked)) {
            setHiddenSeries(hiddenSeries.filter((k) => k !== keyClicked));
        } else {
            setHiddenSeries([...hiddenSeries, keyClicked]);
        }
    };

    const renderLegendText = (value: string, entry: any) => {
        const isHidden = hiddenSeries.includes(entry.dataKey);
        return (
            <span
                className={`transition-all ${isHidden ? "text-zinc-400 line-through dark:text-zinc-600" : "text-zinc-700 dark:text-zinc-300"}`}
            >
                {value}
            </span>
        );
    };

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
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

                <Legend
                    verticalAlign="top"
                    iconType="circle"
                    onClick={handleLegendClick}
                    formatter={renderLegendText}
                    wrapperStyle={{ cursor: "pointer", userSelect: "none" }}
                />

                <Bar
                    dataKey="episodes"
                    fill="var(--color-episodes)"
                    radius={[5, 5, 0, 0]}
                    hide={hiddenSeries.includes("episodes")}
                />
                <Bar
                    dataKey="hours"
                    fill="var(--color-hours)"
                    radius={[5, 5, 0, 0]}
                    hide={hiddenSeries.includes("hours")}
                />
            </BarChart>
        </ChartContainer>
    );
}
