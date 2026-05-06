"use client";

import { Pie, PieChart, Cell, Label, Legend } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    real: {
        label: "Real hours",
        color: "oklch(58.5% 0.233 277.117)",
    },
    generated: {
        label: "Generated hours",
        color: "oklch(70.5% 0.015 286.067)",
    },
} satisfies ChartConfig;

type ReliabilityData = {
    name: string;
    value: number;
    fill: string;
};

export default function ReliabilityChart({
    data,
}: {
    data: ReliabilityData[];
}) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    const totalHours = data
        .reduce((acc, curr) => acc + curr.value, 0)
        .toLocaleString(undefined, { maximumFractionDigits: 0 });

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="65%"
                    outerRadius="95%"
                    strokeWidth={2}
                    stroke="var(--background)"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx - 10}
                                            y={viewBox.cy}
                                            className="fill-zinc-900 text-3xl font-bold dark:fill-zinc-100"
                                        >
                                            {totalHours}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx - 10}
                                            y={viewBox.cy + 24}
                                            className="fill-zinc-500 text-sm dark:fill-zinc-400"
                                        >
                                            Total Hours
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>
                <Legend verticalAlign="top" iconType="circle" />
            </PieChart>
        </ChartContainer>
    );
}
