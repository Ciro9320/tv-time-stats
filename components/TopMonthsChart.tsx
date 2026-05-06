"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    hours: {
        label: "Hours",
        color: "oklch(76.9% 0.188 70.08)",
    },
} satisfies ChartConfig;

export default function TopMonthsChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <XAxis type="number" hide />

                <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    width={55}
                />

                <ChartTooltip
                    cursor={{ fill: "var(--color-zinc-100)", opacity: 0.1 }}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelClassName="text-zinc-900 font-bold"
                        />
                    }
                />

                <Bar
                    dataKey="hours"
                    fill="var(--color-hours)"
                    radius={[0, 5, 5, 0]}
                    barSize={20}
                />
            </BarChart>
        </ChartContainer>
    );
}
