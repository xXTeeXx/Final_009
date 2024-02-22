import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddSubject from "./crudsubjects/addsubjects";
import EditSubject from "./crudsubjects/editsubjects";
import DeleteSubject from "./crudsubjects/deletesubjects";
import Nav from "./Nav";

const SubjectTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [isAddSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
  const [isEditSubjectModalOpen, setEditSubjectModalOpen] = useState(false);
  const [isDeleteSubjectModalOpen, setDeleteSubjectModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/subjects")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddSubject = (newSubject) => {
    axios
      .post("http://localhost:5000/subjects", newSubject)
      .then((response) => {
        setSubjects([...subjects, response.data]);
        setAddSubjectModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
      });
  };

  const handleEditSubject = (subject) => {
    setSelectedSubject(subject);
    setEditSubjectModalOpen(true);
  };

  const handleUpdateSubject = (updatedSubject) => {
    axios
      .put(`http://localhost:5000/subjects/${updatedSubject.ID}`, updatedSubject)
      .then((response) => {
        const updatedSubjects = subjects.map((subject) =>
          subject.ID === updatedSubject.ID ? updatedSubject : subject
        );
        setSubjects(updatedSubjects);
        setEditSubjectModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating subject:", error);
      });
  };

  const handleDeleteSubject = (id) => {
    setSelectedSubject(id);
    setDeleteSubjectModalOpen(true);
  };

  const confirmDeleteSubject = () => {
    axios
      .delete(`http://localhost:5000/subjects/${selectedSubject}`)
      .then((response) => {
        const updatedSubjects = subjects.filter(
          (subject) => subject.ID !== selectedSubject
        );
        setSubjects(updatedSubjects);
        setDeleteSubjectModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
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

  const filteredSubjects = subjects.filter((subject) => {
    return (
      subject.ID.toString().includes(searchTerm) ||
      subject.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
    <Nav/>
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">หน้าจัดการข้อมูลวิชา</h1>
      </div>
      <button
        onClick={() => setAddSubjectModalOpen(true)}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition mb-4"
      >
        เพิ่มข้อมูลวิชา
      </button><br />
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
              รายละเอียด
            </th>
            <th className="py-2 px-4 border-b bg-gray-100 text-center">
              แก้ไข/ลบ
            </th>
          </tr>
        </thead>
        <tbody>
          {paginate(filteredSubjects).map((subject) => (
            <tr key={subject.ID}>
              <td className="py-2 px-4 border-b text-center">{subject.ID}</td>
              <td className="py-2 px-4 border-b text-center">
                {subject.Name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {subject.Description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEditSubject(subject)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject.ID)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
          {subjects.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                ไม่มีวิชาที่มีอยู่.
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
            disabled={paginate(filteredSubjects).length < itemsPerPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            ถัดไป
          </button>
        </div>
        <span>หน้า: {currentPage}</span>
      </div>
      {isAddSubjectModalOpen && (
        <AddSubject
          onClose={() => setAddSubjectModalOpen(false)}
          onAddSubject={handleAddSubject}
        />
      )}
      {isEditSubjectModalOpen && (
        <EditSubject
          subject={selectedSubject}
          onClose={() => setEditSubjectModalOpen(false)}
          onUpdateSubject={handleUpdateSubject}
        />
      )}
      {isDeleteSubjectModalOpen && (
        <DeleteSubject
          subject={selectedSubject}
          onClose={() => setDeleteSubjectModalOpen(false)}
          onDeleteSubject={confirmDeleteSubject}
        />
      )}
    </div>
    </>
  );
};

export default SubjectTable;
