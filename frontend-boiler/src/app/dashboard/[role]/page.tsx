"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Superadmin from "../../../Components/superadmin";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Student {
  _id: string;
  user?: User;
  firstName?: string;
  lastName?: string;
  email?: string;
  assignedTeacher?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [localStorageRole, setLocalStorageRole] = useState("");
  const [data, setData] = useState<Student[]>([]);
  const [allowedActions, setAllowedActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const pathName = usePathname();
  const role = pathName?.split("/")?.[2] || "";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = JSON.parse(localStorage.getItem("role") || '""');
    
    setToken(storedToken);
    setLocalStorageRole(storedRole);
    
    if (!storedToken) {
      router.replace(`/login`);
      return;
    }
    
    if (role && storedRole && role === storedRole) {
      fetchRoleData();
    }
  }, [role, router]);

  const fetchRoleData = async () => {
    try {
      // const res = await axios.get("https://policybasedauth.onrender.com/api/v1/students", {
      const res = await axios.get("http://localhost:5000/api/v1/getstudentdata", {
        withCredentials: true,
      });

      console.log("Role Data:", res);

      let students: Student[];

      if (role === "teacher") {
        students = res.data.data.students;
      } else {
        students = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
      }

      setData(students);
      setAllowedActions(res.data.allowedActions || []);
    } catch (err) {
      console.error("Error in fetching role data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading Dashboard...</div>;
  }

  if (role !== localStorageRole) {
    return (
      <div className="text-center mt-[10vh]">
        <h1>You are not authorize to see {role} route. </h1>
        <h1>Your role is {localStorageRole}, you cannot access {role}.</h1>
        <p> Please Login as {role}.</p>
        
        <div className="flex gap-[2vw] items-center justify-center mt-[2vh]">
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push(`/dashboard/${localStorageRole}`)}
          >
            Get back to role
          </button>
          
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{role} Dashboard</h1>

      {role !== "superadmin" ? (
        allowedActions.includes("view") ? (
          <div className="space-y-4">
            {data.length > 0 ? (
              data.map((item: Student) => {
                const user = role === "admin" || role === "teacher" ? item.user : item;
  
                if (!user) return null;
  
                return (
                  <div
                    key={item._id}
                    className="bg-white p-4 text-black rounded-xl shadow border"
                  >
                    <h2 className="font-semibold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p>Email: {user.email}</p>
  
                    <div className="mt-3 space-x-2 bg-gray-700 p-2 rounded">
                      {allowedActions.includes("edit") && (
                        <button className="bg-yellow-400 px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      )}
                      {allowedActions.includes("delete") && (
                        <button className="bg-red-500 px-3 py-1 rounded text-white text-sm">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                {role === "teacher" && (
                  <p>No Student is assigned to You (Teacher).</p>
                )}
                <p>No data available.</p>
              </>
            )}
          </div>
        ) : (
          <p className="text-red-500">
            You don't have permission to view this data.
          </p>
        )
      ) : (
        <div>
          <Superadmin/>
        </div>
      )}
    </div>
  );
}