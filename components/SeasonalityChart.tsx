"use client";

import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    hours: {
        label: "Total Hours",
        color: "oklch(58.5% 0.233 277.117)",
    },
} satisfies ChartConfig;

type SeasonalityData = {
    season: string;
    hours: number;
};

export default function SeasonalityChart({
    data,
}: {
    data: SeasonalityData[];
}) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No data available
            </div>
        );
    }

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto h-full w-full max-w-md"
        >
            <RadarChart
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
            >
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            labelClassName="text-zinc-900 font-bold"
                        />
                    }
                />

                <PolarGrid className="stroke-zinc-200 dark:stroke-zinc-800" />

                <PolarAngleAxis
                    dataKey="season"
                    tick={{ fill: "#71717a", fontSize: 13, fontWeight: 600 }}
                />

                <PolarRadiusAxis
                    angle={30}
                    domain={[0, "auto"]}
                    tick={false}
                    axisLine={false}
                />

                <Radar
                    name="Total Hours"
                    dataKey="hours"
                    stroke="var(--color-hours)"
                    strokeWidth={2}
                    fill="var(--color-hours)"
                    fillOpacity={0.4}
                />
            </RadarChart>
        </ChartContainer>
    );
}
