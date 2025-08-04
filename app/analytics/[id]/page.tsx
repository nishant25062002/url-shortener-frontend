"use client";
import ClicksOverTime from "@/components/analytics/ClickOverTime";
import DeviceDonutChart from "@/components/analytics/DeviceDonutChart";
import ReferrerBarChart from "@/components/analytics/ReferrerBarChart";
import { useParams } from "next/navigation";

const AnalyticsPage = () => {
  const params = useParams();
  const { id } = params;
  console.log("id", id);

  const sampleData = [
    { date: "07/25", count: 14 },
    { date: "07/26", count: 29 },
    { date: "07/27", count: 22 },
    { date: "07/28", count: 34 },
  ];
  const referrerData = [
    { referrer: "LinkedIn", count: 40 },
    { referrer: "Facebook", count: 5 },
    { referrer: "Google", count: 20 },
    { referrer: "Twitter", count: 6 },
    { referrer: "Bitly", count: 15 },
    { referrer: "Direct", count: 9 },
    { referrer: "Other", count: 5 },
  ];
  const deviceData = [
    { name: "Desktop", value: 146 },
    { name: "E-Reader", value: 101 },
    { name: "Tablet", value: 70 },
    { name: "Mobile", value: 50 },
    { name: "Unknown", value: 14 },
  ];

  return (
    <main className="!bg-[#f4f6fa] flex flex-col w-full">
      <section className="!bg-[#f4f6fa] max-w-4xl flex flex-col mx-auto w-full py-4">
        <h1 className="text-2xl font-medium my-3 pt-3 !bg-[#f4f6fa]">
          Your Shortened Links
        </h1>
        <div className="py-4 gap-4 flex flex-col md:flex-row w-full !bg-[#f4f6fa]">
          <ClicksOverTime data={sampleData} />
          <ReferrerBarChart data={referrerData} />
        </div>
        <div className="py-4 flex flex-col md:flex-row gap-4 !bg-[#f4f6fa] w-full">
          <DeviceDonutChart data={deviceData} />
        </div>
      </section>
    </main>
  );
};

export default AnalyticsPage;
