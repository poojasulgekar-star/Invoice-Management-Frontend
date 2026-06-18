import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    passwordHash: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );

       // Save logged-in user
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login successful");
      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
  alert(error.response?.data || "Invalid Email or Password");
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
        <div className="w-2/5 bg-gradient-to-br from-sky-500 to-indigo-900 text-white p-10 flex flex-col justify-center">
          <h4 className="uppercase tracking-[5px] text-sm mb-3">
            Welcome Back
          </h4>

          <h1 className="text-5xl font-bold mb-4">
            SIGN IN
          </h1>

          <p className="text-gray-200">
            Access your MIS & Invoice Management Dashboard.
          </p>
        </div>

        <div className="w-3/5 p-12">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-900 to-sky-500 flex items-center justify-center text-white text-4xl">
              👤
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold text-indigo-900 mb-8">
            LOGIN
          </h2>

          <form className="space-y-5" onSubmit={loginUser}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full border-2 border-sky-100 rounded-xl p-3 mb-2 focus:outline-none focus:border-sky-500"
              required
            />

            <input
              type="password"
              name="passwordHash"
              placeholder="Password"
              value={loginData.passwordHash}
              onChange={handleChange}
              className="w-full border-2 border-sky-100 rounded-xl p-3 mb-2 focus:outline-none focus:border-sky-500"
              required
            />

            <div className="flex justify-between items-center">
              <Link to="#" className="text-sky-500 text-sm">
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-900 to-sky-500 text-white px-10 py-3 rounded-full font-semibold shadow-lg"
              >
                LOGIN
              </button>
            </div>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-sky-600 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;