import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const sendResetLink = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
  "https://invoice-management-backend-tqr8.onrender.com/auth/forgot-password",
  {
    email: email,
  }
);
console.log(email);
      alert(response.data);

    } catch (error) {
      alert(error.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={sendResetLink}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="bg-indigo-900 text-white w-full p-3 rounded"
        >
          Send Reset Link
        </button>

        <Link
          to="/"
          className="block text-center mt-4 text-blue-600"
        >
          Back to Login
        </Link>

      </form>

    </div>
  );
}

export default ForgotPassword;