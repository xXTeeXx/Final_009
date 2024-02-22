import React, { useState } from "react";

const AddTeacher = ({ onClose, onAddTeacher }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      FirstName: firstName,
      LastName: lastName,
      Age: parseInt(age),
      Department: department,
    };
    onAddTeacher(newTeacher);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">เพิ่มข้อมูลครู</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              ชื่อ:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              นามสกุล:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              อายุ:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              แผนก:
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
