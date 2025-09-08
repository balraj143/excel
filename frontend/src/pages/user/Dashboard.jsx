import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fileToUpdate, setFileToUpdate] = useState(null);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/upload", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploads(res.data.uploads);
    } catch (err) {
      console.error("Failed to fetch uploads", err);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/upload/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUploads();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newFile || !fileToUpdate) return;

    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/upload/${fileToUpdate._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNewFile(null);
      setFileToUpdate(null);
      fetchUploads();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-20 px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
          Uploaded Files
        </h1>

        {uploads.map((upload, index) => (
          <div
            key={index}
            className="bg-yellow-100 shadow-md rounded-2xl mb-6 overflow-hidden transition-all duration-300"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 px-4 sm:px-6 py-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 break-words">
                  {upload.filename}
                </h2>
                <p className="text-sm text-gray-500">
                  Uploaded:{" "}
                  {upload.date && !isNaN(new Date(upload.date).getTime())
                    ? new Date(upload.date).toLocaleString()
                    : "No date available"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFileToUpdate(upload)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(upload._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-sky-500 text-xl sm:text-2xl"
                >
                  {expandedIndex === index ? "−" : "+"}
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedIndex === index && (
              <div className="px-4 sm:px-6 pb-6">
                {Array.isArray(upload.data) && upload.data.length > 0 ? (
                  <div className="overflow-x-auto mt-4">
                    <table className="table-auto w-full text-xs sm:text-sm border border-black">
                      <thead className="bg-sky-200">
                        <tr>
                          {Object.keys(upload.data[0]).map((key) => (
                            <th
                              key={key}
                              className="border border-black px-2 py-1 sm:px-3 sm:py-2 text-left text-gray-800"
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-red-200">
                        {upload.data.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((value, j) => (
                              <td
                                key={j}
                                className="border border-black px-2 py-1 sm:px-3 sm:py-2 text-gray-800 break-words"
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-red-500 mt-2">
                    No data available
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Update Modal */}
        {fileToUpdate && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                Update File
              </h2>
              <form onSubmit={handleUpdate}>
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => setNewFile(e.target.files[0])}
                  className="w-full mb-4"
                />
                <div className="flex justify-end gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setFileToUpdate(null);
                      setNewFile(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
