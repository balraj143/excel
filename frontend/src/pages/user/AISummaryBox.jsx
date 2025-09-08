import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../src/utils/axiosInstance";

const AISummaryBox = ({ uploadId }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
     console.log("uploadId:", uploadId);
   if (!uploadId || uploadId.trim() === "") return;

    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(
          `/api/upload/${uploadId}/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummary(res.data.summary);
      } catch (err) {
        console.error("AI Summary fetch failed:", err);
        setError("⚠️ Failed to fetch AI summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [uploadId]);

  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mt-6 shadow-lg max-w-3xl mx-auto">
      <div className="flex items-center mb-3">
        <span className="text-xl">🧠</span>
        <h3 className="text-lg font-semibold text-yellow-800 ml-2">
          AI Summary (beta)
        </h3>
      </div>

      {loading && (
        <p className="text-yellow-600 italic text-sm">⏳ Generating summary...</p>
      )}

      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}

      {!loading && !error && summary && (
        <p className="text-yellow-800 text-base whitespace-pre-wrap leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
};

export default AISummaryBox;
