// components/ReferrerBarChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Download, MoreVertical } from "lucide-react";

type ReferrerData = {
  referrer: string;
  count: number;
};

interface ReferrerBarChartProps {
  data: ReferrerData[];
}

export default function ReferrerBarChart({ data }: ReferrerBarChartProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500">
          Clicks + scans by referrer
        </h2>
        <div className="flex gap-2 text-gray-400">
          <button className="hover:text-black">
            <Download size={16} />
          </button>
          <button className="hover:text-black">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="referrer" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ fontSize: 14 }}
            formatter={(value: number) => [`${value}`, "Clicks + scans"]}
          />
          <Bar
            dataKey="count"
            fill="#06b6d4"
            radius={[4, 4, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
