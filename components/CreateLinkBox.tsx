"use client";

import { useState } from "react";
import axios from "axios";

type ShortenResponse = {
  shortCode: string;
};

type ShortenError = {
  error: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateLinkBox = ({ refetch }: any) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [title, setTitle] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post<ShortenResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shorten`,
        {
          originalUrl,
          title,
          customCode,
        }
      );

      const fullShortUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${res.data.shortCode}`;
      setLoading(false);
      setShortUrl(fullShortUrl);
      refetch();

      setOriginalUrl("");
      setCustomCode("");
      setTitle("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const axiosError = err.response?.data as ShortenError;
      setError(axiosError?.error || "Something went wrong.");
    }
  };

  return (
    <section className="!bg-[#f4f6fa]">
      <div className="flex justify-between items-center mb-2 !bg-[#f4f6fa]">
        <h1 className="text-xl font-medium mb-3 !bg-[#f4f6fa]">
          Create a new link
        </h1>
        <a href="#" className="text-blue-600 text-sm font-medium !bg-[#f4f6fa]">
          Bulk upload
        </a>
      </div>
      <div className=" rounded-lg shadow-sm px-4 py-3 flex flex-col gap-2 mb-4">
        <p className="text-sm text-gray-600 mb-6">
          You can create <strong>Unlimited links</strong> this month.{" "}
          <a href="#" className="text-blue-600">
            Upgraded to premium.
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block font-medium mb-1 text-sm text-[#6f6f6f]">
                Destination
              </label>
              <input
                type="url"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full py-1 px-2 border-1 border-[#d4d4d4] rounded text-sm"
                placeholder="https://example.com/my-long-url"
              />
            </div>

            <div className="w-full">
              <label className="block font-medium mb-1 text-sm text-[#6f6f6f]">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-1 px-2 border-1 border-[#d4d4d4] rounded text-sm"
                placeholder="My Campaign"
              />
            </div>
          </div>

          <div className="border-t border-[#d4d4d4]  pt-4">
            <h2 className="font-medium text-base mb-2 text-[#424242]">
              Short link
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <div>
                <label className="block font-medium mb-1 text-sm text-[#6f6f6f]">
                  Domain
                </label>
                {/* <select
                disabled
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              >
                <option>download.medcab.in</option>
              </select> */}
                <div className="w-full py-1 px-2 border-1 border-[#919191] rounded cursor-not-allowed text-[#5f5f5f] text-sm">
                  visit.medcab.in
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1 text-sm text-[#6f6f6f]">
                  Custom back-half (optional)
                </label>
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="w-full py-1 px-2 border-1 border-[#d4d4d4] rounded text-sm"
                  placeholder="custom-link"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Create <strong>Unlimited more custom back-halves</strong> this
              month.{" "}
              <a href="#" className="text-blue-600">
                Upgraded to premium.
              </a>
            </p>
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="sumitBtn mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              {loading ? "Processing" : "Shorten URL"}
            </button>
          </div>
        </form>

        {error && <p className="mt-4 text-red-600 font-medium">⚠️ {error}</p>}

        {shortUrl && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <p className="font-medium mb-1">Your short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateLinkBox;
