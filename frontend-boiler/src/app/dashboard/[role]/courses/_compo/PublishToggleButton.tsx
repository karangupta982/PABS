import React from 'react';
import axios from 'axios';

interface Course {
  _id: string;
  isPublished: boolean;
}

interface PublishToggleButtonProps {
  course: Course;
  refresh: () => void;
}

const PublishToggleButton: React.FC<PublishToggleButtonProps> = ({ course, refresh }) => {
  const togglePublish = async () => {
    try {
      const action = course.isPublished ? 'unpublish' : 'publish';
      if(action === 'publish'){
        await axios.put(`http://localhost:5000/api/v1/courses/admin/${course._id}/publish`,{},{
        // await axios.put(`http://localhost:5000/api/v1/courses/admin/${course._id}/${action}`,{
            withCredentials: true,
          });
      }
      else{
        await axios.put(`http://localhost:5000/api/v1/courses/admin/${course._id}/unpublish`,{}, {
            withCredentials: true,
          });
      }
      
      refresh();
    } catch (err: any) {
      alert('Failed to update publish status');
    }
  };

  return (
    <button
      onClick={togglePublish}
      className={`px-3 py-1 rounded text-white ${
        course.isPublished ? 'bg-red-600' : 'bg-green-600'
      }`}
    >
      {course.isPublished ? 'Unpublish' : 'Publish'}
    </button>
  );
};

export default PublishToggleButton;
