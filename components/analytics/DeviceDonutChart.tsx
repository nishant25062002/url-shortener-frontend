"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Download, MoreVertical } from "lucide-react";

type DeviceData = {
  name: string;
  value: number;
};

interface DeviceDonutChartProps {
  data: DeviceData[];
}

const COLORS = ["#14b8a6", "#99f6e4", "#3b82f6", "#c7d2fe", "#f97316"]; // Desktop, E-Reader, Tablet, Mobile, Unknown

export default function DeviceDonutChart({ data }: DeviceDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500">
          Clicks + scans by device
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

      <div className="flex items-center justify-between">
        <ResponsiveContainer width="50%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: number) => [`${val}`, "Clicks + scans"]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="w-1/2">
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold">{total}</p>
            <p className="text-xs text-gray-500">Clicks + Scans</p>
          </div>
          <ul className="text-sm space-y-1">
            {data.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  ></span>
                  {item.name}
                </span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
