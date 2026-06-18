import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [passwordHash, setPasswordHash] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/reset-password",
        {
          resetToken: token,
          passwordHash: passwordHash,
        }
      );

      alert(res.data);

      navigate("/");
    } catch (error) {
      alert(error.response?.data || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={resetPassword}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg"
        >
          Reset Password
        </button>
      </form>

    </div>
  );
}

export default ResetPassword;