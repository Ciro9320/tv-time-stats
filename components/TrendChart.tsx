"use client";

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
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 0, left: -20 }}
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

                <Legend verticalAlign="top" iconType="circle" />

                <Line
                    type="monotone"
                    dataKey="episodes"
                    stroke="var(--color-episodes)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                />
                <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--color-hours)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ChartContainer>
    );
}
