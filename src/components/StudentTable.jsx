import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddStudent from "./crudstudent/Addstudent";
import EditStudent from "./crudstudent/editstudent";
import DeleteStudent from "./crudstudent/deletestudent";
import Nav from "./Nav";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [isAddStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setEditStudentModalOpen] = useState(false);
  const [isDeleteStudentModalOpen, setDeleteStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddStudent = (newStudent) => {
    axios
      .post("http://localhost:5000/students", newStudent)
      .then((response) => {
        setStudents([...students, response.data]);
        setAddStudentModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setEditStudentModalOpen(true);
  };

  const handleUpdateStudent = (updatedStudent) => {
    axios
      .put(`http://localhost:5000/students/${updatedStudent.ID}`, updatedStudent)
      .then((response) => {
        const updatedStudents = students.map((student) =>
          student.ID === updatedStudent.ID ? updatedStudent : student
        );
        setStudents(updatedStudents);
        setEditStudentModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  const handleDeleteStudent = (id) => {
    setSelectedStudent(id);
    setDeleteStudentModalOpen(true);
  };

  const confirmDeleteStudent = () => {
    axios
      .delete(`http://localhost:5000/students/${selectedStudent}`)
      .then((response) => {
        const updatedStudents = students.filter(
          (student) => student.ID !== selectedStudent
        );
        setStudents(updatedStudents);
        setDeleteStudentModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.Age.toString().includes(searchTerm) ||
      student.ID.toString().includes(searchTerm) ||
      student.Grade.toString().includes(searchTerm)
    );
  });

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">หน้าจัดการข้อมูลนักเรียน</h1>
        </div>
        <button
          onClick={() => setAddStudentModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition mb-4"
        >
          เพิ่มข้อมูลนักเรียน
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
              <th className="py-2 px-4 border-b bg-gray-100 text-center">ชื่อจริง</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">นามสกุล</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">อายุ</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">เกรด</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {paginate(filteredStudents).map((student) => (
              <tr key={student.ID}>
                <td className="py-2 px-4 border-b text-center">{student.ID}</td>
                <td className="py-2 px-4 border-b text-center">{student.FirstName}</td>
                <td className="py-2 px-4 border-b text-center">{student.LastName}</td>
                <td className="py-2 px-4 border-b text-center">{student.Age}</td>
                <td className="py-2 px-4 border-b text-center">{student.Grade}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEditStudent(student)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.ID)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="justify-between items-center mt-4">
          <div>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              ก่อนหน้า
            </button>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={paginate(students).length < itemsPerPage}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              ถัดไป
            </button>
          </div>
          <span>หน้า: {currentPage}</span>
        </div>
        {isAddStudentModalOpen && (
          <AddStudent onClose={() => setAddStudentModalOpen(false)} onAddStudent={handleAddStudent} />
        )}
        {isEditStudentModalOpen && (
          <EditStudent student={selectedStudent} onClose={() => setEditStudentModalOpen(false)} onUpdateStudent={handleUpdateStudent} />
        )}
        {isDeleteStudentModalOpen && (
          <DeleteStudent student={selectedStudent} onClose={() => setDeleteStudentModalOpen(false)} onDeleteStudent={confirmDeleteStudent} />
        )}
      </div>
    </>
  );
};

export default StudentTable;
