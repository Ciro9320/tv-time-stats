"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    average: {
        label: "Avg. Episode Length (min)",
        color: "oklch(64.5% 0.246 16.439)",
    },
} satisfies ChartConfig;

type RatioData = {
    date: string;
    average: number;
};

export default function RatioChart({ data }: { data: RatioData[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
            >
                <defs>
                    <linearGradient
                        id="colorAverage"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="var(--color-average)"
                            stopOpacity={0.3}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-average)"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>

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
                    tickFormatter={(value) => `${value}m`}
                />

                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            labelClassName="text-zinc-900 font-bold"
                        />
                    }
                />

                <Area
                    type="monotone"
                    dataKey="average"
                    stroke="var(--color-average)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAverage)"
                    activeDot={{ r: 6 }}
                />
            </AreaChart>
        </ChartContainer>
    );
}
