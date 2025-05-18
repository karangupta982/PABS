"use client";

import { useState } from 'react';
import axios from 'axios';


export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [message, setMessage] = useState('');

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log("formData:", formData);
      // const res = await axios.post('https://policybasedauth.onrender.com/api/v1/auth/signup', formData);
      const res = await axios.post('http://localhost:5000/api/v1/auth/signup', formData);
      // console.log("res:", res);
      setMessage(res.data.message || 'Signup successful');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Signup failed');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    // <div className="">
  
    <div className="max-w-md mx-auto mt-[20vh] p-6 shadow-md border rounded-xl ">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {/* {message==="User Signup successfull" && <div className="text-sm text-center text-green-500 mb-3">{message}</div>} */}
      {message && <div className="text-sm text-center text-green-500 mb-3">{message}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-2 border rounded bg-gray-500 text-white"
          required
        >
          <option value="superadmin">Super Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign up
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
          If you have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
    </div>
    // </div>
  );
}
