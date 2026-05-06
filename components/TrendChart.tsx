"use client";

import { useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
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

type TrendData = {
    date: string;
    episodes: number;
    hours: number;
};

export default function TrendChart({ data }: { data: TrendData[] }) {
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
            <LineChart
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
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
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

                <Line
                    type="monotone"
                    dataKey="episodes"
                    stroke="var(--color-episodes)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                    hide={hiddenSeries.includes("episodes")}
                />
                <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--color-hours)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                    hide={hiddenSeries.includes("hours")}
                />
            </LineChart>
        </ChartContainer>
    );
}
