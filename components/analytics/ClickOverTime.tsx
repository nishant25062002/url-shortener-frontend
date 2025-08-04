// components/ClicksOverTime.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ClickData = {
  date: string;
  count: number;
};

interface ClicksOverTimeProps {
  data: ClickData[];
}

export default function ClicksOverTime({ data }: ClicksOverTimeProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full">
      <h2 className="text-sm font-medium text-gray-500 mb-4">
        Clicks + scans over time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
