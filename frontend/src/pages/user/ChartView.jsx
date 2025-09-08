// ChartView.jsx
import axiosInstance from "../utils/axiosInstance";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import * as THREE from "three";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartView = () => {
  const [chartType, setChartType] = useState("Bar");
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const chart3DRef = useRef(null);

  // Fetch monthly summary data
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(
          "/api/upload/monthly-summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const labels = res.data.map((entry) => entry._id);
        const data = res.data.map((entry) => entry.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Uploads per Month",
              data,
              backgroundColor: [
                "rgba(99, 102, 241, 0.7)",
                "rgba(16, 185, 129, 0.7)",
                "rgba(239, 68, 68, 0.7)",
                "rgba(245, 158, 11, 0.7)",
              ],
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error loading chart data", err);
      }
    };

    fetchSummary();
  }, []);

  // Render 3D Column Chart with Three.js
  useEffect(() => {
    if (chartType === "3D" && chartData) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        chart3DRef.current.clientWidth / chart3DRef.current.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        chart3DRef.current.clientWidth,
        chart3DRef.current.clientHeight
      );
      chart3DRef.current.innerHTML = "";
      chart3DRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x6366f1 }),
        new THREE.MeshBasicMaterial({ color: 0x10b981 }),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b }),
      ];

      chartData.datasets[0].data.forEach((value, i) => {
        const cube = new THREE.Mesh(geometry, materials[i % materials.length]);
        cube.scale.y = value;
        cube.position.x = i * 2 - chartData.labels.length;
        cube.position.y = value / 2;
        scene.add(cube);
      });

      camera.position.z = 10;

      const animate = () => {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    }
  }, [chartType, chartData]);

  const downloadChart = () => {
    if (chartType === "3D") {
      alert("3D chart download not supported yet.");
      return;
    }
    const url = chartRef.current.toBase64Image();
    const a = document.createElement("a");
    a.href = url;
    a.download = "chart.png";
    a.click();
  };

  if (!chartData)
    return <div className="text-sm text-gray-500">Loading chart...</div>;

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  return (
     <div className="min-h-screen flex items-center justify-center  ">

    <div className="bg-yellow-100 rounded-2xl shadow-md p-10 m-10 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          📊 Uploads Per Month
        </h2>
        <div className="flex gap-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded p-2 text-sm"
          >
            <option value="Bar">Bar Chart</option>
            <option value="Line">Line Chart</option>
            <option value="Pie">Pie Chart</option>
            <option value="Scatter">Scatter Chart</option>
            <option value="3D">3D Column Chart</option>
          </select>
          <button
            onClick={downloadChart}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
          >
            ⬇️ Download PNG
          </button>
        </div>
      </div>

      {chartType === "Bar" && (
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      )}
      {chartType === "Line" && (
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      )}
      {chartType === "Pie" && (
        <div className="w-full flex justify-center">
  <div className="max-w-xs">
    <Pie
      data={chartData}
      options={{
        chartOptions,
        responsive: true,
        maintainAspectRatio: false,
      }}
      width={200}
      height={400}
    />
  </div>
</div>
      )}
      {chartType === "Scatter" && (
        <Scatter
          ref={chartRef}
          data={{
            datasets: [
              {
                label: "Uploads",
                data: chartData.datasets[0].data.map((y, x) => ({ x, y })),
                backgroundColor: "rgba(99, 102, 241, 0.7)",
              },
            ],
          }}
          options={chartOptions}
        />
      )}
      {chartType === "3D" && (
        <div ref={chart3DRef} className="w-full h-96"></div>
      )}
    </div>
    </div>

  );
};

export default ChartView;
