import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Upload,
  Bot,
  LifeBuoy,
} from "lucide-react";

const StatCard = ({ icon, title, value, bgColor }) => (
  <motion.div
    className={`rounded-xl p-4 text-center shadow-md text-white ${bgColor}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex justify-center text-3xl mb-2">{icon}</div>
    <div className="text-sm font-medium">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    uploads: 0,
    aiSummaries: 0,
    supportTickets: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  const [recentUploads, setRecentUploads] = useState([]);

useEffect(() => {
  const fetchRecentUploads = async () => {
    try {
      const { data } = await axiosInstance.get("/api/admin/recent-uploads", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRecentUploads(data);
    } catch (err) {
      console.error("Error fetching uploads", err);
    }
  };

  fetchRecentUploads();
}, []);


const [userUploadStats, setUserUploadStats] = useState([]);

useEffect(() => {
  const fetchUploadStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/api/admin/user-upload-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserUploadStats(res.data);
    } catch (err) {
      console.error("Failed to fetch user upload stats", err);
    }
  };

  fetchUploadStats();
}, []);



  return (
     <div className="min-h-screen flex items-center justify-center  ">

    <div className="max-h-screen w-full px-4 md:px-16 py-10 ">
      <h1 className="text-3xl md:text-4xl font-bold flex  justify-center items-center gap-2 mb-10">
        <LayoutDashboard className="text-blue-600" />
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<Users size={28} />}
          title="Total Users"
          value={stats.users}
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={<Upload size={28} />}
          title="Total Uploads"
          value={stats.uploads}
          bgColor="bg-green-500"
        />
        <StatCard
          icon={<Bot size={28} />}
          title="AI Summaries"
          value={stats.aiSummaries}
          bgColor="bg-purple-500"
        />
        <StatCard
          icon={<LifeBuoy size={28} />}
          title="Support Tickets"
          value={stats.supportTickets}
          bgColor="bg-red-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <motion.div
            className="rounded-xl p-6 bg-yellow-100 shadow-md"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl font-semibold mb-2">Recent Uploads</h2>
            {recentUploads.length > 0 ? (
              <ul className="text-gray-700 text-sm space-y-1">
                {recentUploads.map((upload, index) => {
                  
                  return (
                    <li key={index} className="border-b py-1">
                      {upload.filename} - {new Date(upload.date).toLocaleDateString()}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No uploads yet.</p>
            )}
          </motion.div>

        <motion.div
            className="rounded-xl p-6 bg-yellow-100 shadow-md"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl font-semibold mb-2">User Upload Activity</h2>
            {userUploadStats.length > 0 ? (
              <ul className="text-gray-700 text-sm space-y-1">
                {userUploadStats.map((user, index) => (
                  <li key={index} className="border-b py-1">
                    {user.email} - {user.uploadCount} uploads
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No activity available.</p>
            )}
          </motion.div>
      </div>
    </div>
    </div>

  );
};

export default AdminDashboard;
