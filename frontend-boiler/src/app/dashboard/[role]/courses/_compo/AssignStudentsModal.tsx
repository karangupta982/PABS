import React, { useState } from 'react';
import axios from 'axios';

interface AssignStudentsModalProps {
  user: {
    role: 'admin' | 'teacher' | string;
  };
  course: {
    _id: string;
  };
  closeModal: () => void;
  refresh: () => void;
}

const AssignStudentsModal: React.FC<AssignStudentsModalProps> = ({
  user,
  course,
  closeModal,
  refresh,
}) => {
  const [students, setStudents] = useState<string>('');

  const handleAssign = async () => {
    try {
      const ids = students.split(',').map((id) => id.trim());
      const url =
        user.role === 'admin'
          ? `http://localhost:5000/api/v1/courses/admin/${course._id}/assign-students`
          : `http://localhost:5000/api/v1/courses/teacher/${course._id}/assign-students`;

      await axios.put(url, { students: ids },{
        withCredentials: true,
      });
      alert('Student has been assigned!');
      refresh();
      closeModal();
    } catch (err) {
      alert('Failed to assign students');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold mb-3">Assign Students</h3>
        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Comma-separated student IDs"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={closeModal} className="px-4 py-2">Cancel</button>
          <button
            onClick={handleAssign}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignStudentsModal;
