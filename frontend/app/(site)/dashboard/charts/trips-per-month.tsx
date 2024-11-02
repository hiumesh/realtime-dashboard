"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getChartData } from "@/services/api/dashboard";
import { TripsPerMonthRecord } from "@/types/api/dashboard";

export const description = "A multiple bar chart";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  green: {
    label: "Green Taxi",
    color: "hsl(var(--chart-1))",
  },
  yellow: {
    label: "Yellow Taxi",
    color: "hsl(var(--chart-2))",
  },
  fhv: {
    label: "For Hire Vehicles",
    color: "hsl(var(--chart-3))",
  },
  hvfhv: {
    label: "High Volume For Hire Vehicles",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function TripsPerMonth() {
  const [data, setData] = useState({ list: [], loading: true });

  const getData = async () => {
    setData({ list: [], loading: true });
    const data = (await getChartData(
      "trips_per_month"
    )) as TripsPerMonthRecord[];
    const monthObj = data.reduce(
      (acc: Record<string, { [key: string]: number }>, curr) => {
        if (!acc[curr.month_name]) {
          acc[curr.month_name] = { green: 0, yellow: 0, hvfhv: 0, fhv: 0 };
        }
        acc[curr.month_name][curr.vehicle_type] = curr.total_trips;
        return acc;
      },
      {}
    );
    const list = Object.keys(monthObj).map((month) => {
      return {
        ...monthObj[month],
        month: month,
      };
    });
    setData({ list: list, loading: false });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Trips per Month</CardTitle>
        <CardDescription>Year 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data.list}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="green" fill="var(--color-green)" radius={4} />
            <Bar dataKey="yellow" fill="var(--color-yellow)" radius={4} />
            <Bar dataKey="fhv" fill="var(--color-fhv)" radius={4} />
            <Bar dataKey="hvfhv" fill="var(--color-hvfhv)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total trips per month by different vehicle type
        </div>
      </CardFooter>
    </Card>
  );
}
