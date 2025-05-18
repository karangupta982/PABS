"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const router = useRouter();

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log("formData: ", formData);
      const res = await axios.post(
        // 'https://policybasedauth.onrender.com/api/v1/auth/login',
        'http://localhost:5000/api/v1/auth/login',
        formData,
        {
          withCredentials: true,
        }
      );
      // console.log("res after login", res);
      // console.log("login successful");
      // console.log(`role: ${res.data.user.role}`);

      setMessage(`Login successful as ${res.data.user.role}`);

      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("role", JSON.stringify(res.data.user.role));
      localStorage.setItem("userId", JSON.stringify(res.data.user._id));
      localStorage.setItem("userName", JSON.stringify(res.data.user.firstName));


      localStorage.setItem("theme", "light");


      router.push(`/dashboard/${res.data.user.role}`);
    } catch (err: unknown) {
      // type guard for axios error
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Login failed');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  
  return (
    <div className="max-w-md mx-auto  p-6 mt-[20vh] shadow-md border rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {message && <div className="text-sm text-center text-green-500 mb-3">{message}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
    </div>
  );
};

export default Login;
