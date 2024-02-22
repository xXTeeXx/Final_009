import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUser from "./crudusers/addusers";
import EditUser from "./crudusers/editusers";
import DeleteUser from "./crudusers/deleteusers";
import Nav from "./Nav";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddUser = (newUser) => {
    axios
      .post("http://localhost:5000/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setAddUserModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    axios
      .put(`http://localhost:5000/users/${updatedUser.ID}`, updatedUser)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.ID === updatedUser.ID ? updatedUser : user
        );
        setUsers(updatedUsers);
        setEditUserModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeleteUser = (email) => {
    setSelectedUser(email);
    setDeleteUserModalOpen(true);
  };

  const confirmDeleteUser = () => {
    axios
      .delete(`http://localhost:5000/users/${selectedUser}`)
      .then((response) => {
        const updatedUsers = users.filter(
          (user) => user.Email !== selectedUser
        );
        setUsers(updatedUsers);
        setDeleteUserModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.ID.toString().includes(searchTerm) ||
      user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">หน้าจัดการข้อมูลผู้ใช้</h1>
        </div>
        <button
          onClick={() => setAddUserModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition mb-4"
        >
          เพิ่มข้อมูลผู้ใช้
        </button>
        <br />
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="border border-gray-300 rounded-md px-2 py-1 mb-4"
        />
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">ID</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                ชื่อ
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                อีเมล์
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                รหัสผ่าน
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                แก้ไข/ลบ
              </th>
            </tr>
          </thead>
          <tbody>
            {paginate(filteredUsers).map((user) => (
              <tr key={user.Email}>
                <td className="py-2 px-4 border-b text-center">{user.ID}</td>
                <td className="py-2 px-4 border-b text-center">{user.Name}</td>
                <td className="py-2 px-4 border-b text-center">{user.Email}</td>
                <td className="py-2 px-4 border-b text-center">*********</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.Email)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  ไม่มีข้อมูลผู้ใช้.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="justify-between items-center mt-4">
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            ก่อนหน้า
          </button>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={paginate(filteredUsers).length < itemsPerPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            ถัดไป
          </button>
        </div>
        <span>หน้า: {currentPage}</span>
      </div>
      {isAddUserModalOpen && (
        <AddUser
          onClose={() => setAddUserModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}
      {isEditUserModalOpen && (
        <EditUser
          user={selectedUser}
          onClose={() => setEditUserModalOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}
      {isDeleteUserModalOpen && (
        <DeleteUser
          user={selectedUser}
          onClose={() => setDeleteUserModalOpen(false)}
          onDeleteUser={confirmDeleteUser}
        />
      )}
    </>
  );
};

export default UserTable;
