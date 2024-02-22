import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";

function SignIn({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        setErrorMessage("กรุณากรอกทั้งอีเมลและรหัสผ่าน");
        return;
      }

      const response = await axios.post("http://localhost:5000/users/login", {
        Email: email,
        Password: password,
      });

      if (response.data.message === "success") {
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        }
        navigate("/Dashboard");
        console.log("เข้าสู่ระบบสำเร็จ");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else if (error.request) {
        setErrorMessage("ไม่ได้รับการตอบสนองจากเซิร์ฟเวอร์");
      } else {
        setErrorMessage("เกิดข้อผิดพลาด:" + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md w-4/5">
        <h2 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-600 rounded-md focus:outline-none"
              >
                {showPassword ? "ซ่อน" : "แสดง"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            เข้าสู่ระบบ
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            ไม่มีบัญชีใช่ไหม?{" "}
            <Link to="/signup" className="text-blue-500">
              สมัครสมาชิกที่นี่
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default SignIn;
