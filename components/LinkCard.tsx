/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Copy,
  Share2,
  Edit3,
  MoreHorizontal,
  BarChart2,
  Calendar,
  Tag,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

type LinkCardProps = {
  title: string;
  originalUrl: string;
  shortCode: string;
  faviconUrl?: string;
  createdAt: string;
  tags?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
};

export default function LinkCard({
  title,
  originalUrl,
  shortCode,
  faviconUrl,
  createdAt,
  tags = [],
  refetch,
}: LinkCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shortUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${shortCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this short URL?")) return;

    try {
      setDeleting(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shorten/${shortCode}`
      );
      // You can refresh or remove the item from UI based on parent state
      // window.location.reload(); // or trigger a refetch if using React Query
      refetch();
    } catch (err) {
      console.error("Error deleting URL:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="!bg-white rounded-lg shadow-sm px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img
          src={faviconUrl || "/favicon.ico"}
          alt="Favicon"
          className="w-6 h-6 rounded-sm"
        />
        <h2 className="font-semibold text-gray-800 text-sm">{title}</h2>
      </div>

      <a
        href={shortUrl}
        target="_blank"
        className="text-blue-600 text-sm font-semibold hover:underline"
      >
        {shortUrl}
      </a>

      <p className="text-sm text-gray-700 break-all">{originalUrl}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push(`/analytics/${shortCode}`)}
          >
            <BarChart2 size={14} />
            <span>Click data</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{createdAt}</span>
          </div>
          {tags.length === 0 ? (
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>No tags</span>
            </div>
          ) : (
            tags.map((tag, i) => (
              <div
                key={i}
                className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
              >
                {tag}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={handleCopy}
            className="text-gray-600 hover:text-black cursor-pointer"
            title="Copy"
          >
            <Copy size={16} />
          </button>
          <button
            className="text-gray-600 hover:text-black cursor-pointer"
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button
            className="text-gray-600 hover:text-black cursor-pointer"
            title="Edit"
          >
            <Edit3 size={16} />
          </button>
          <button
            className="text-gray-600 hover:text-black cursor-pointer"
            title="More"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "X" : <MoreHorizontal size={16} />}
          </button>
          {showMore && (
            <div className="absolute right-0 bottom-[100%] mb-2 bg-white border rounded shadow-sm z-10">
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-[8px] py-[4px] text-red-600 hover:bg-gray-50 text-sm w-full cursor-pointer"
              >
                <Trash2 size={14} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {copied && (
        <div className="text-green-600 text-sm mt-1 font-medium">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
