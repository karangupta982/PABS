import React from 'react';
import PublishToggleButton from './PublishToggleButton';
import axios from 'axios';

interface User {
  _id: string;
  role: 'admin' | 'teacher' | string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  owner?: {
    _id: string;
    name: string;
  } | string;
}

interface CourseCardProps {
  course: Course;
  user: User;
  onEdit: (course: Course) => void;
  onAssign: (course: Course) => void;
  refresh: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, user, onEdit, onAssign, refresh }) => {
  const isOwner = typeof course.owner === 'object' ? course.owner._id === user._id : course.owner === user._id;

  // console.log("Entered in course card")

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this course?');
    if (!confirm) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/v1/courses/admin/${course._id}`,
        {
          withCredentials: true,
        }
      );
      refresh();
    } catch (error) {
      console.error('Failed to delete course:', error);
      alert('Error deleting course');
    }
  };


  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p>{course.description}</p>
     
      <div className="mt-2  flex gap-[1vw]">

        {/* {user.role === 'admin' && (
          <PublishToggleButton course={course} refresh={refresh} />
        )} */}
        {(user.role === 'admin' || user.role === 'teacher' || isOwner ) && (
          <button
            onClick={() => onEdit(course)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}
        {(user.role === 'admin' || user.role === 'teacher' || isOwner) && (
          <button
            onClick={() => onAssign(course)}
            className="bg-purple-500 text-white px-3 py-1 rounded"
          >
            Assign Students
          </button>
        )}

        {(user.role === 'admin') && (
          <button
            onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        )}
        {user.role === 'admin' && (
          <PublishToggleButton course={course} refresh={refresh} />
        )}

      </div>
    </div>
  );
};

export default CourseCard;





