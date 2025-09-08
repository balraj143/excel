import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Login from "./auth/login";
import Register from "./auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadForm from "./pages/user/UploadForm";
import ChartView from "./pages/user/ChartView";
// import AISummaryBox from "./pages/user/AISummaryBox";
import Help from "./pages/user/Help";
import UploadHistory from "./pages/admin/UploadHistory";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminSupport from "./pages/admin/AdminSupport";
// import AdminUsers from "./pages/AdminUsers";
// import AdminUploads from "./pages/AdminUploads";

function App() {

  return (
   <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload/:id" element={<UploadForm />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/charts" element={<ChartView />} />
          {/* <Route path="/summary" element={<AISummaryBox />} /> */}
          <Route path="/help" element={<Help />} />
          <Route path="/admin/uploads" element={<UploadHistory />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/help" element={<AdminSupport />} />





          


           {/* <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/uploads" element={<AdminUploads />} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
