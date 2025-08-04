"use client";

import axios from "axios";
import LinkCard from "@/components/LinkCard";
import CreateLinkBox from "./CreateLinkBox";
import { useQuery } from "@tanstack/react-query";

type Link = {
  title: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
};

const fetchLinks = async (): Promise<Link[]> => {
  const res = await axios.get<Link[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/links`
  );
  return res.data || [];
};

export default function Links() {
  const {
    data: links,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery<Link[]>({
    queryKey: ["links"],
    queryFn: fetchLinks,
    refetchInterval: 5 * 60 * 60 * 1000,
  });

  // if (isLoading) return <p>Loading links...</p>;
  if (error) return <p>Error loading links</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4 !bg-[#f4f6fa]">
      <CreateLinkBox refetch={refetch} />

      <div className="!bg-[#f4f6fa]">
        <h1 className="text-xl font-medium mb-3 !bg-[#f4f6fa]">
          Your Shortened Links
        </h1>

        {isLoading || isFetching ? (
          <p className="text-gray-500">Loading...</p>
        ) : links?.length === 0 ? (
          <p className="text-gray-600">No links found.</p>
        ) : (
          <div className="flex flex-col gap-4 !bg-[#f4f6fa]">
            {links?.map((link, i) => (
              <LinkCard
                refetch={refetch}
                key={i}
                title={link.title || new URL(link.originalUrl).hostname}
                originalUrl={link.originalUrl}
                shortCode={link.shortCode}
                faviconUrl={`https://www.google.com/s2/favicons?domain=${
                  new URL(link.originalUrl).hostname
                }`}
                createdAt={new Date(link.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
