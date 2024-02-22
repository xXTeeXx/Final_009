import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaUser } from 'react-icons/fa';

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
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-200 p-4 rounded-lg flex items-center justify-center flex-col hover:bg-blue-300 transition duration-300 ease-in-out transform hover:scale-105">
            <FaUserGraduate className="text-4xl mb-2" />
            <h2 className="text-xl font-semibold mb-2">จำนวนนักเรียน</h2>
            <p className="text-2xl">{studentCount}</p>
          </div>
          <div className="bg-green-200 p-4 rounded-lg flex items-center justify-center flex-col hover:bg-green-300 transition duration-300 ease-in-out transform hover:scale-105">
            <FaChalkboardTeacher className="text-4xl mb-2" />
            <h2 className="text-xl font-semibold mb-2">จำนวนครู</h2>
            <p className="text-2xl">{teacherCount}</p>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg flex items-center justify-center flex-col hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
            <FaBookOpen className="text-4xl mb-2" />
            <h2 className="text-xl font-semibold mb-2">จำนวนวิชา</h2>
            <p className="text-2xl">{subjectCount}</p>
          </div>
          <div className="bg-purple-200 p-4 rounded-lg flex items-center justify-center flex-col hover:bg-purple-300 transition duration-300 ease-in-out transform hover:scale-105">
            <FaUser className="text-4xl mb-2" />
            <h2 className="text-xl font-semibold mb-2">จำนวนผู้ใช้</h2>
            <p className="text-2xl">{userCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
