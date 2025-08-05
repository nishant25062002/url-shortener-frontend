/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ClicksOverTime from "@/components/analytics/ClickOverTime";
import DeviceDonutChart from "@/components/analytics/DeviceDonutChart";
import EngagementsByLocation from "@/components/analytics/EngagementsByLocation";
import ReferrerBarChart from "@/components/analytics/ReferrerBarChart";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

const countryCodeToName: Record<string, string> = {
  US: "United States",
  IN: "India",
  JP: "Japan",
  MX: "Mexico",
  RU: "Russian Federation",
  CA: "Canada",
  GB: "United Kingdom",
  ND: "Others",
};

const regionCodeToName: Record<string, string> = {
  MH: "Maharashtra",
  DL: "Delhi",
  KA: "Karnataka",
  GJ: "Gujarat",
  TN: "Tamil Nadu",
  UP: "Uttar Pradesh",
  // add more as needed
};

const AnalyticsPage = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<any>(null);

  const sampleDataMap = new Map<string, number>();

  data?.clicks?.forEach((click: any) => {
    const date = new Date(click.timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // YY

    const key = `${day}/${month}/${year}`; // "05/08/25"

    sampleDataMap.set(key, (sampleDataMap.get(key) || 0) + 1);
  });

  const sampleData = Array.from(sampleDataMap.entries())
    .map(([date, count]) => ({
      date,
      count,
    }))
    .reverse();

  // 2. Clicks by Referrer
  const referrerMap = new Map<string, number>();

  data?.clicks?.forEach((click: any) => {
    let ref = click.referrer?.trim();

    if (!ref) {
      ref = "Other";
    } else {
      try {
        const url = new URL(ref);
        const hostname = url.hostname;

        // Extract meaningful name
        if (hostname.includes("google")) {
          ref = "Google";
        } else if (hostname.includes("youtube")) {
          ref = "Youtube";
        } else if (hostname.includes("facebook")) {
          ref = "Facebook";
        } else if (hostname.includes("instagram")) {
          ref = "Instagram";
        } else if (hostname.includes("linkedin")) {
          ref = "LinkedIn";
        } else if (hostname.includes("x")) {
          ref = "Twitter";
        } else if (hostname.includes("bit.ly") || hostname.includes("bitly")) {
          ref = "Bitly";
        } else if (hostname.includes("medcab")) {
          ref = "Internal"; // Optional: treat self-links separately
        } else {
          ref = "Other";
        }
      } catch {
        ref = "Other"; // In case it's not a valid URL
      }
    }

    referrerMap.set(ref, (referrerMap.get(ref) || 0) + 1);
  });

  const referrerData = Array.from(referrerMap.entries()).map(
    ([referrer, count]) => ({
      referrer,
      count,
    })
  );

  // 3. Clicks by Device Type (using ua-parser-js)
  const deviceMap = new Map<string, number>();
  const parser = new UAParser();

  data?.clicks?.forEach((click: any) => {
    const parsed = parser.setUA(click.userAgent || "").getResult();

    let name: string;

    switch (parsed.device.type) {
      case "mobile":
        name = "Mobile";
        break;
      case "tablet":
        name = "Tablet";
        break;
      case "console":
        name = "Console";
        break;
      case "smarttv":
        name = "Smart TV";
        break;
      case "wearable":
        name = "Wearable";
        break;
      case "embedded":
        name = "Embedded";
        break;
      default:
        name = "Desktop"; // When type is undefined
    }

    deviceMap.set(name, (deviceMap.get(name) || 0) + 1);
  });

  const deviceData = Array.from(deviceMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  // 4.
  const countryMap = new Map<string, number>();

  data?.clicks?.forEach((click: any) => {
    const code = click.country || "ND"; // "ND" = Not Detected
    const country = countryCodeToName[code] || code;

    countryMap.set(country, (countryMap.get(country) || 0) + 1);
  });

  const countryData = Array.from(countryMap.entries()).map(
    ([country, count]) => ({
      country,
      count,
      percent: ((count / data.clickCount) * 100).toFixed(2),
    })
  );

  // Optional: Sort descending
  countryData.sort((a, b) => b.count - a.count);

  // 4.2
  const regionMap = new Map<string, number>();

  data?.clicks?.forEach((click: any) => {
    const code = click.country || "ND"; // "ND" = Not Detected
    const country = countryCodeToName[code] || code;
    const stateCode = click.region === "ND" ? "-" : click.region; // ND = Not Detected
    const region = `${regionCodeToName[stateCode] || stateCode}, ${country}`;

    regionMap.set(region, (regionMap.get(region) || 0) + 1);
  });

  const regionData = Array.from(regionMap.entries()).map(([region, count]) => ({
    region,
    count,
    percent: ((count / data.clickCount) * 100).toFixed(2),
  }));

  // Sort descending
  regionData.sort((a, b) => b.count - a.count);

  // 4.3
  const cityMap = new Map<string, number>();

  data?.clicks?.forEach((click: any) => {
    const code = click.country || "ND";
    const country = countryCodeToName[code];
    const city = `${click.city === "ND" ? "-" : click.city}, ${country}`;

    cityMap.set(city, (cityMap.get(city) || 0) + 1);
  });

  // Convert to array
  const cityData = Array.from(cityMap.entries()).map(([city, count]) => ({
    city,
    count,
    percent: ((Number(count) / Number(data.clickCount)) * 100).toFixed(2),
  }));

  // Sort descending
  cityData.sort((a, b) => b.count - a.count);

  const fetchLinkAnalytics = async (): Promise<any> => {
    const res = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/${id}`
    );
    return res.data || [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await fetchLinkAnalytics();
        setData(temp);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
          <EngagementsByLocation
            countryData={countryData}
            stateData={regionData}
            cityData={cityData}
          />
        </div>
      </section>
    </main>
  );
};

export default AnalyticsPage;
