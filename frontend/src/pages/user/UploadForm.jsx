import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../src/utils/axiosInstance";
// import AISummaryBox from "../user/AISummaryBox";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadId, setUploadId] = useState(""); // Store the upload ID from backend

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Check if uploadId is returned
      console.log("✅ Upload response:", res.data);
      const uploadId = res.data.uploadId;
    if (uploadId) {
        setUploadId(uploadId);
        setMessage("✅ File uploaded successfully.");
      } else {
        setMessage("❌ Upload succeeded but no upload ID returned.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed. Please try again.");
      setUploadId("");
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center  ">
    <div className="bg-yellow-100 rounded-2xl shadow-md p-20 max-w-2xl w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">📤 Upload Excel File</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </form>

      {/* Only show summary if uploadId exists */}
      {/* {uploadId && <AISummaryBox uploadId={uploadId} />} */}
    </div>
    </div>

  );
};

export default UploadForm;
