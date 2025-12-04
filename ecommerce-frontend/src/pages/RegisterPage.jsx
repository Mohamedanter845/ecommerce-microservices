// src/pages/RegisterPage.jsx
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Register with\nEmail: ${email}\nPassword: ${password}`);
    // هنا ممكن تضيف منطق التسجيل الحقيقي
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          Confirm Password:
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
