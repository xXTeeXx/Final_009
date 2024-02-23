import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUser,
} from "react-icons/fa";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudentCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });

    axios
      .get("http://localhost:5000/teachers")
      .then((response) => {
        setTeacherCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });

    axios
      .get("http://localhost:5000/subjects")
      .then((response) => {
        setSubjectCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching subject data:", error);
      });

    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUserCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-lg flex items-center justify-center flex-col hover:from-purple-700 hover:to-purple-900 transition duration-300 ease-in-out transform hover:scale-105">
            <FaUserGraduate className="text-4xl mb-2 text-white" />
            <h2 className="text-xl font-semibold mb-2 text-white">
              จำนวนนักเรียน
            </h2>
            <p className="text-2xl text-white">{studentCount}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-lg flex items-center justify-center flex-col hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-105">
            <FaChalkboardTeacher className="text-4xl mb-2 text-white" />
            <h2 className="text-xl font-semibold mb-2 text-white">จำนวนครู</h2>
            <p className="text-2xl text-white">{teacherCount}</p>
          </div>
        </div><br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-lg flex items-center justify-center flex-col hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out transform hover:scale-105">
            <FaBookOpen className="text-4xl mb-2 text-white" />
            <h2 className="text-xl font-semibold mb-2 text-white">จำนวนวิชา</h2>
            <p className="text-2xl text-white">{subjectCount}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-4 rounded-lg flex items-center justify-center flex-col hover:from-indigo-600 hover:to-indigo-800 transition duration-300 ease-in-out transform hover:scale-105">
            <FaUser className="text-4xl mb-2 text-white" />
            <h2 className="text-xl font-semibold mb-2 text-white">
              จำนวนผู้ใช้
            </h2>
            <p className="text-2xl text-white">{userCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
