import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../src/utils/axiosInstance";

const UploadHistory = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/api/admin/upload", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : res.data.uploads || [];
        setUploads(data);
      } catch (err) {
        console.error("Error fetching uploads:", err);
        setError("Failed to load upload history.");
      }
    };

    fetchHistory();
  }, []);

  const groupedByUser = uploads.reduce((acc, upload) => {
    const userId = upload.user?._id || upload.user;
    const userEmail = upload.user?.email || "Unknown User";
    if (!acc[userId]) {
      acc[userId] = { email: userEmail, uploads: [] };
    }
    acc[userId].uploads.push(upload);
    return acc;
  }, {});

  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className="bg-yellow-100 rounded-2xl shadow-md p-10 max-w-2xl w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">📁 Upload History</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : Object.keys(groupedByUser).length === 0 ? (
        <p className="text-gray-500">No uploads yet.</p>
      ) : (
        <ul className="space-y-4">
          {Object.entries(groupedByUser).map(([userId, { email, uploads }]) => (
            <li key={userId} className="border-b pb-2">
              <button
                className="font-semibold text-blue-600 "
                onClick={() => setSelectedUser(selectedUser === userId ? null : userId)}
              >
                {email}
              </button>

              {selectedUser === userId && (
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {uploads.map((u, i) => (
                    <li key={i} className="ml-4">
                      📄 {u.filename || "Unnamed File"} —{" "}
                      {u.date
                        ? new Date(u.date).toLocaleString()
                        : "Unknown Date"}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>

  );
};

export default UploadHistory;
