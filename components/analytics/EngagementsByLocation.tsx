/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Download, MoreHorizontal } from "lucide-react";

export default function EngagementsByLocation({
  countryData,
  stateData,
  cityData,
}: any) {
  const [activeTab, setActiveTab] = useState<"countries" | "cities" | "states">(
    "countries"
  );

  return (
    <div className="bg-white shadow rounded-xl p-4 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Engagements by location</h2>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-gray-100">
            <Download size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => setActiveTab("countries")}
          className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "countries" ? "bg-gray-100" : "text-gray-500"
          }`}
        >
          Countries
        </button>
        <button
          onClick={() => setActiveTab("states")}
          className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "states" ? "bg-gray-100" : "text-gray-500"
          }`}
        >
          States
        </button>
        <button
          onClick={() => setActiveTab("cities")}
          className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "cities" ? "bg-gray-100" : "text-gray-500"
          }`}
        >
          Cities
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-left border-b">
              <th className="py-2">#</th>
              {activeTab === "countries" && <th className="py-2">Country</th>}
              {activeTab === "states" && <th className="py-2">State</th>}
              {activeTab === "cities" && <th className="py-2">City</th>}
              <th className="py-2 text-right">Engagements</th>
              <th className="py-2 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "countries" &&
              countryData?.map((item: any, idx: number) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-1">{idx + 1}</td>
                  <td className="truncate max-w-[120px]">{item.country}</td>
                  <td className="py-1 text-right">{item.count}</td>
                  <td className="py-1 text-right">{item.percent}</td>
                </tr>
              ))}
            {activeTab === "states" &&
              stateData?.map((item: any, idx: number) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-1">{idx + 1}</td>
                  <td className="truncate max-w-[120px]">
                    {item.region == "ND" ? "" : item.region},
                  </td>
                  <td className="py-1 text-right">{item.count}</td>
                  <td className="py-1 text-right">{item.percent}</td>
                </tr>
              ))}
            {activeTab === "cities" &&
              cityData?.map((item: any, idx: number) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-1">{idx + 1}</td>
                  <td className="truncate max-w-[120px]">
                    {item.city === "ND" ? "Others" : item.city}
                  </td>
                  <td className="py-1 text-right">{item.count}</td>
                  <td className="py-1 text-right">{item.percent}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
