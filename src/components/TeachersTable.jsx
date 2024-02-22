import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddTeacher from "./crudteachers/addteachers";
import EditTeacher from "./crudteachers/editteachers";
import DeleteTeacher from "./crudteachers/deleteteachers";
import Nav from "./Nav";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAddTeacherModalOpen, setAddTeacherModalOpen] = useState(false);
  const [isEditTeacherModalOpen, setEditTeacherModalOpen] = useState(false);
  const [isDeleteTeacherModalOpen, setDeleteTeacherModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddTeacher = (newTeacher) => {
    axios
      .post("http://localhost:5000/teachers", newTeacher)
      .then((response) => {
        setTeachers([...teachers, response.data]);
        setAddTeacherModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding teacher:", error);
      });
  };

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setEditTeacherModalOpen(true);
  };

  const handleUpdateTeacher = (updatedTeacher) => {
    axios
      .put(
        `http://localhost:5000/teachers/${updatedTeacher.ID}`,
        updatedTeacher
      )
      .then((response) => {
        const updatedTeachers = teachers.map((teacher) =>
          teacher.ID === updatedTeacher.ID ? updatedTeacher : teacher
        );
        setTeachers(updatedTeachers);
        setEditTeacherModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
      });
  };

  const handleDeleteTeacher = (id) => {
    setSelectedTeacher(id);
    setDeleteTeacherModalOpen(true);
  };

  const confirmDeleteTeacher = () => {
    axios
      .delete(`http://localhost:5000/teachers/${selectedTeacher}`)
      .then((response) => {
        const updatedTeachers = teachers.filter(
          (teacher) => teacher.ID !== selectedTeacher
        );
        setTeachers(updatedTeachers);
        setDeleteTeacherModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting teacher:", error);
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.ID.toString().includes(searchTerm) ||
      teacher.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.Age.toString().includes(searchTerm) ||
      teacher.Department.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold">หน้าจัดการข้อมูลครู</h1>
        </div>
        <button
          onClick={() => setAddTeacherModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition mb-4"
        >
          เพิ่มข้อมูลครู
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
                ชื่อจริง
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                นามสกุล
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                อายุ
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                แผนก
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">
                แก้ไข/ลบ
              </th>
            </tr>
          </thead>
          <tbody>
            {paginate(filteredTeachers).map((teacher) => (
              <tr key={teacher.ID}>
                <td className="py-2 px-4 border-b text-center">{teacher.ID}</td>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.FirstName}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.LastName}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.Age}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.Department}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEditTeacher(teacher)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.ID)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No teachers available.
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
            disabled={paginate(filteredTeachers).length < itemsPerPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            ถัดไป
          </button>
        </div>
        <span>หน้า: {currentPage}</span>
      </div>
      {isAddTeacherModalOpen && (
        <AddTeacher
          onClose={() => setAddTeacherModalOpen(false)}
          onAddTeacher={handleAddTeacher}
        />
      )}
      {isEditTeacherModalOpen && (
        <EditTeacher
          teacher={selectedTeacher}
          onClose={() => setEditTeacherModalOpen(false)}
          onUpdateTeacher={handleUpdateTeacher}
        />
      )}
      {isDeleteTeacherModalOpen && (
        <DeleteTeacher
          teacher={selectedTeacher}
          onClose={() => setDeleteTeacherModalOpen(false)}
          onDeleteTeacher={confirmDeleteTeacher}
        />
      )}
    </>
  );
};

export default TeacherTable;
