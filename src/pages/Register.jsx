import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    role: "SALES",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/auth/register",
        user
      );

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data || "Registration Failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(10, 15, 80, 0.8),
            rgba(10, 15, 80, 0.8)
          ),
          url('https://png.pngtree.com/thumb_back/fw800/background/20251210/pngtree-digital-invoice-management-and-financial-document-processing-image_20787667.webp')
        `,
      }}
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex">

        {/* Left Side */}
        <div className="w-2/5 bg-gradient-to-br from-sky-500 to-indigo-900 text-white p-10 flex flex-col justify-center">
          <h4 className="uppercase tracking-[5px] text-sm mb-3">
            CREATE ACCOUNT
          </h4>

          <h1 className="text-5xl font-bold mb-4">
            SIGN UP
          </h1>

          <p className="text-gray-200">
            Register to access MIS & Invoice Management System.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-3/5 p-12">

          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-900 to-sky-500 flex items-center justify-center text-white text-4xl">
              📝
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold text-indigo-900 mb-8">
            REGISTER
          </h2>

          <form className="space-y-4" onSubmit={registerUser}>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={user.fullName}
              onChange={handleChange}
              className="w-full border-2 border-sky-100 rounded-xl p-3 mb-2 focus:outline-none focus:border-sky-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full border-2 border-sky-100 rounded-xl p-3 mb-2 focus:outline-none focus:border-sky-500"
              required
            />

            <input
              type="password"
              name="passwordHash"
              placeholder="Password"
              value={user.passwordHash}
              onChange={handleChange}
              className="w-full border-2 border-sky-100 rounded-xl p-3 mb-2 focus:outline-none focus:border-sky-500"
              required
            />

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full border-2 border-sky-100 rounded-xl p-3 mb-2 focus:outline-none focus:border-sky-500"
            >
              <option value="ADMIN">Admin</option>
              <option value="SALES">Sales Person</option>
            </select>

            <div className="flex justify-between items-center">

              <p className="text-sm">
                Already Registered?
              </p>

              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-900 to-sky-500 text-white px-10 py-3 rounded-full font-semibold shadow-lg"
              >
                SIGN UP
              </button>

            </div>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-sky-600 font-semibold"
              >
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Register;