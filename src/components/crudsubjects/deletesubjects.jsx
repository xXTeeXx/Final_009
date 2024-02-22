import React from "react";

const DeleteSubject = ({ onClose, onDeleteSubject }) => {
  const handleDelete = () => {
    onDeleteSubject();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">ยืนยันการลบ</h2>
        <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบวิชานี้?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubject;
