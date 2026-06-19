import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const [userCount, setUserCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

useEffect(() => {
  fetchCounts();

  let timer;

  const resetTimer = () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      localStorage.removeItem("user");
      alert("Session expired due to inactivity");
      navigate("/");
    },  10 * 60 * 1000); // 10 minutes
  };

  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("click", resetTimer);

  resetTimer();

  return () => {
    clearTimeout(timer);
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    window.removeEventListener("click", resetTimer);
  };
}, [navigate]);

const fetchCounts = async () => {
  try {
    const usersRes = await axios.get(
      "https://invoice-management-backend-tqr8.onrender.com/auth/users/count"
    );

    const groupsRes = await axios.get(
      "https://invoice-management-backend-tqr8.onrender.com/api/groups/count"
    );

    setUserCount(usersRes.data);
    setGroupCount(groupsRes.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-indigo-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          MIS Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md p-4 flex justify-center gap-10">
        <Link
          to="/dashboard"
          className="font-semibold text-indigo-900 hover:text-sky-500"
        >
          Dashboard
        </Link>

        <Link
          to="/groups"
          className="font-semibold text-indigo-900 hover:text-sky-500"
        >
          Groups
        </Link>
        
 {role === "ADMIN" && (
  <>
        <Link
          to="/chains"
          className="font-semibold text-indigo-900 hover:text-sky-500"
        >
          Chains
        </Link>

         <Link to="/users"
         className="font-semibold text-indigo-900 hover:text-sky-500">
        Users
      </Link>
    </>
  )}
      </nav>

      {/* User Details Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-indigo-900">
          Welcome {user?.fullName}
        </h2>

        <p className="mb-3">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="mb-3">
          <strong>Role:</strong> {user?.role}
        </p>

        <p>
          <strong>Status:</strong> {user?.status}
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">
            Total Users
          </h3>

          <p className="text-4xl font-bold">
            {userCount}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">
            Total Groups
          </h3>

         <p className="text-4xl font-bold">
          {groupCount}
        </p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">
            Role
          </h3>

          <p className="text-3xl font-bold mt-3">
            {user?.role}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;