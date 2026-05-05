"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Legend, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type MonthlyHoursChartProps = {
    data: any[];
    years: string[];
};

const colorPalette = [
    "#4f46e5", // indigo-600
    "#0ea5e9", // sky-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
];

export default function MonthlyHoursChart({
    data,
    years,
}: MonthlyHoursChartProps) {
    const [hiddenYears, setHiddenYears] = useState<string[]>([]);

    if (!data || data.length === 0 || years.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    const dynamicConfig = years.reduce((acc, year, index) => {
        acc[year] = {
            label: year,
            color: colorPalette[index % colorPalette.length],
        };
        return acc;
    }, {} as ChartConfig);

    const handleLegendClick = (e: any) => {
        const yearClicked = e.dataKey;
        if (hiddenYears.includes(yearClicked)) {
            setHiddenYears(hiddenYears.filter((year) => year !== yearClicked));
        } else {
            setHiddenYears([...hiddenYears, yearClicked]);
        }
    };

    const renderLegendText = (value: string, entry: any) => {
        const isHidden = hiddenYears.includes(entry.dataKey);
        return (
            <span
                className={`transition-all ${isHidden ? "text-zinc-400 line-through dark:text-zinc-600" : "text-zinc-700 dark:text-zinc-300"}`}
            >
                {value}
            </span>
        );
    };

    return (
        <ChartContainer config={dynamicConfig} className="h-full w-full">
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
                    dataKey="month"
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
                    cursor={{ fill: "var(--color-border)", opacity: 0.1 }}
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            labelClassName="text-zinc-900 font-bold"
                        />
                    }
                />

                <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    onClick={handleLegendClick}
                    formatter={renderLegendText}
                    wrapperStyle={{ cursor: "pointer", userSelect: "none" }}
                />

                {years.map((year) => (
                    <Bar
                        key={year}
                        dataKey={year}
                        fill={`var(--color-${year})`}
                        radius={[5, 5, 0, 0]}
                        hide={hiddenYears.includes(year)}
                    />
                ))}
            </BarChart>
        </ChartContainer>
    );
}
