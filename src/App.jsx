import { Route, Routes } from "react-router-dom";
import LoginWithLocalStorage from "./components/SignIn";
import StudentTable from "./components/StudentTable";
import TeacherTable from "./components/TeachersTable";
import SubjectTable from "./components/SubjectTable";
import SignIn from "./components/SignIn";
import SignUp from "./components/register";
import UserTable from "./components/UsersTable";
import Dashboard from "./components/Showdata";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/SubjectTable" element={<SubjectTable />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/TeacherTable" element={<TeacherTable />} />
          <Route path="/StudentTable" element={<StudentTable />} />
          <Route path="/UserTable" element={<UserTable />} />
          <Route path="/admin/adminimg/admintype" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
