import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                console.log('Registration successful');
                setIsRegistered(true);
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md w-4/5">
                <h2 className="text-2xl font-bold mb-4">สมัครสมาชิก</h2>
                {!isRegistered && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">
                                ชื่อ:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">
                                อีเมล:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">
                                รหัสผ่าน:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                        >
                            ยืนยัน
                        </button>
                    </form>
                )}
                {isRegistered && (
                    <p className="text-green-500">ลงทะเบียนสำเร็จ</p>
                )}
                <br /><Link to="/" className="text-blue-500 hover:underline mt-4">กลับไปหน้าเข้าสู่ระบบ</Link>
            </div>
        </div>
    );
};

export default Register;
