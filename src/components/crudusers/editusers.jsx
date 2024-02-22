import React, { useState } from 'react';

const EditUser = ({ user, onClose, onUpdateUser }) => {
  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState(user.Password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, Name: name, Email: email, Password: password }; // แก้ให้ใช้ password แทน Password
    onUpdateUser(updatedUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
        ชื่อ:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-4 py-2 mb-4 w-full"
            required
          />
          อีเมล:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-4 py-2 mb-4 w-full"
            required
          />
          รหัสผ่าน:
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-4 py-2 mb-4 w-full"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
