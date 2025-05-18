"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './_compo/CourseCard';
import CourseFormModal from './_compo/CourseFormModal';
import AssignStudentsModal from './_compo/AssignStudentsModal';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
}

interface Course {
  _id: string;
  title: string;
  description: string;
  owner?: {
    _id: string;
    name: string;
  };
  isPublished?: boolean;
}

interface CoursesPageProps {
  user?: User; 
}

const CoursesPage: React.FC<CoursesPageProps> = ({ user }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  // const pathName = usePathname();
  // const role = pathName?.split("/")?.[2] || "";
  const localStorageRole = JSON.parse(localStorage.getItem("role") || '""');

  // console.log("localStrorageRole",localStorageRole)
  

  // if(localStorageRole === "student"){
  //   return (
  //     <div className="text-center mt-[10vh]">
  //     <h1>You are not authorize to see this route. </h1>
  //     <h1>Your role is {localStorageRole}, you cannot access this protected route.</h1>
  //     <p> Please Login as {localStorageRole}.</p>
      
  //     <div className="flex gap-[2vw] items-center justify-center mt-[2vh]">
  //       <button
  //         className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  //         onClick={() => router.push(`/dashboard/${localStorageRole}`)}
  //       >
  //         Get back to role
  //       </button>
        
  //       <button 
  //         className="bg-blue-500 text-white px-4 py-2 rounded" 
  //         onClick={() => router.replace('/login')}
  //       >
  //         Login
  //       </button>
  //     </div>
  //   </div>
  //   )
  // }

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    try {
      
      if (!currentUser) {
        const storedRole = localStorage.getItem("role");
        const storedUserId = localStorage.getItem("userId");
        const storedName = localStorage.getItem("userName");

        // console.log("role in coursePage",storedRole)
        // console.log("userId in coursePage",storedUserId)
        // console.log("name in coursePage",storedName)

        
        if (storedRole && storedUserId) {
          setCurrentUser({
            _id: storedUserId,
            name: storedName || "User",
            role: JSON.parse(storedRole) as 'admin' | 'teacher' | 'student'
          });
        } else if (user) {
          // Use the user from props if available
          setCurrentUser(user);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to get user information", error);
      setLoading(false);
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const res = await axios.get<Course[]>('http://localhost:5000/api/v1/courses', {
        withCredentials: true,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      });
      
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleAssign = (course: Course) => {
    setSelectedCourse(course);
    setShowAssignModal(true);
  };

  const handleCreateCourse = () => {
    if (!currentUser) {
      alert("You need to be logged in to create a course");
      return;
    }
    
    setShowForm(true);
    setSelectedCourse(null);
  };

  // Show loading state while determining user role
  if (loading) {
    return <div className="p-4 text-center">Loading courses...</div>;
  }

  const userRole = currentUser?.role || '';

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses</h2>
        {(userRole === 'admin' || userRole === 'teacher') && (
          <button
            onClick={handleCreateCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Course
          </button>
        )}
      </div>

      {(userRole === 'admin' || userRole === 'teacher') ? (
          courses.length === 0 && !loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No courses available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  user={currentUser || { _id: '', name: '', role: 'student' }}
                  onEdit={handleEdit}
                  onAssign={handleAssign}
                  refresh={fetchCourses}
                />
              ))}
            </div>
          )
      ) : (
        <div className="text-center mt-[10vh]">
      <h1>You are not authorize to see this route. </h1>
      <h1>Your role is {localStorageRole}, you cannot access this protected route.</h1>
      <p> Please Login as {localStorageRole}.</p>
      
      <div className="flex gap-[2vw] items-center justify-center mt-[2vh]">
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push(`/dashboard/${localStorageRole}`)}
        >
          Get back to role
        </button>
        
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => router.replace('/login')}
        >
          Login
        </button>
      </div>
    </div>

      )
    }
      {/* {courses.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No courses available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              user={currentUser || { _id: '', name: '', role: 'student' }}
              onEdit={handleEdit}
              onAssign={handleAssign}
              refresh={fetchCourses}
            />
          ))}
        </div>
      )} */}

      {showForm && currentUser && (
        <CourseFormModal
          user={currentUser}
          course={selectedCourse}
          closeModal={() => setShowForm(false)}
          refresh={fetchCourses}
        />
      )}

      {showAssignModal && selectedCourse && currentUser && (
        <AssignStudentsModal
          user={currentUser}
          course={selectedCourse}
          closeModal={() => setShowAssignModal(false)}
          refresh={fetchCourses}
        />
      )}

    </div>
  );
};

export default CoursesPage;