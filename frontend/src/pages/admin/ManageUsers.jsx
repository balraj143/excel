import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const USERS_PER_PAGE = 4;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditEmail(user.email);
    setEditRole(user.role);
    setIsDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/admin/users/${editUser._id}`,
        { email: editEmail, role: editRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
     <div className="min-h-screen flex items-center justify-center  ">

    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <Input
        placeholder="Search by email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        className="mb-4 max-w-md"
      />

      <div className="grid gap-4">
        {paginatedUsers.map((user) => (
          <Card key={user._id}>
            <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-yellow-100 p-4">
              <div>
                <p className="font-semibold">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="destructive"  className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6 max-w-md mx-auto">
        <Button className="bg-sky-500 hover:bg-sky-600"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button  className="bg-sky-500 hover:bg-sky-600"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
        <div className="space-y-3">
          <div>
            <Label>Email</Label>
            <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={editRole} onChange={(e) => setEditRole(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={handleUpdate}>Save</Button>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
    </div>

  );
};

export default ManageUsers;
