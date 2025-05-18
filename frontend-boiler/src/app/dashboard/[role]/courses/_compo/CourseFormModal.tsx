import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface User {
    _id: string;
  name: string;
  role: 'admin' | 'teacher' | string;
}

interface Course {
  _id?: string;
  title: string;
  description: string;
  owner:string;
}

interface CourseFormModalProps {
  user: User;
  course: Course;
  closeModal: () => void;
  refresh: () => void;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({ user, course, closeModal, refresh }) => {
    // console.log("user id in courseModal",user._id);
  const [form, setForm] = useState<Course>({
    title: '',
    description: '',
    owner:'',
  });
    // const userId = user._id;
// const form = { title: course.title, description: course.description, owner:userId }

// console.log("userId",userId)
useEffect(() => {
    if (course) {
      setForm({
        title: course.title || '',
        description: course.description || '',
        owner: user._id || '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        owner: user._id || '',
      });
    }
  }, [course, user._id]);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const urlBase = user.role === 'admin' ? 'http://localhost:5000/api/v1/courses/admin' : 'http://localhost:5000/api/v1/courses/teacher';

      if (course && course._id) {
        await axios.put(`${urlBase}/${course._id}`, form,{
            withCredentials: true,
        });
      } else {
        await axios.post(urlBase, form,{
            withCredentials: true,
        });
      }

      refresh();
      closeModal();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">{course ? 'Edit' : 'Create'} Course</h2>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={closeModal} className="px-4 py-2">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseFormModal;
