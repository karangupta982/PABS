// "use client";
// import React, { useState, useEffect } from "react";

// const roles = ["Admin", "Teacher", "Student"];
// const possibleActions = ["view", "edit", "delete"];

// const SuperAdminActions = () => {
//   const [selectedRole, setSelectedRole] = useState("Teacher");
//   const [users, setUsers] = useState<any[]>([]);
//   const [selectedUser, setSelectedUser] = useState<string>("");
//   const [userActions, setUserActions] = useState<string[]>([]);

//   // Fetch users under selected role
//   useEffect(() => {
//     if (selectedRole) {
//       fetch(`/api/${selectedRole.toLowerCase()}s`)
//         .then((res) => res.json())
//         .then((data) => {
//           setUsers(data);
//           setSelectedUser("");
//           setUserActions([]);
//         });
//     }
//   }, [selectedRole]);

//   // Fetch selected user's actions
//   useEffect(() => {
//     if (selectedUser) {
//       fetch(`/api/${selectedRole.toLowerCase()}/${selectedUser}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setUserActions(data.actions);
//         });
//     }
//   }, [selectedUser]);

//   const toggleAction = (action: string) => {
//     setUserActions((prev) =>
//       prev.includes(action)
//         ? prev.filter((a) => a !== action)
//         : [...prev, action]
//     );
//   };

//   const handleSubmit = async () => {
//     const response = await fetch(`/api/update-actions`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         role: selectedRole.toLowerCase(),
//         userId: selectedUser,
//         actions: userActions,
//       }),
//     });

//     if (response.ok) {
//       alert("Actions updated successfully.");
//     } else {
//       alert("Error updating actions.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Manage User Actions</h2>

//       {/* Role selector */}
//       <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//         Select Role
//       </label>
//       <select
//         value={selectedRole}
//         onChange={(e) => setSelectedRole(e.target.value)}
//         className="w-full p-2 mb-4 rounded border dark:bg-gray-800 dark:text-white"
//       >
//         {roles.map((role) => (
//           <option key={role} value={role}>
//             {role}
//           </option>
//         ))}
//       </select>

//       {/* User selector */}
//       <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//         Select User
//       </label>
//       <select
//         value={selectedUser}
//         onChange={(e) => setSelectedUser(e.target.value)}
//         className="w-full p-2 mb-4 rounded border dark:bg-gray-800 dark:text-white"
//       >
//         <option value="">-- Select --</option>
//         {users.map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.user?.name || user._id}
//           </option>
//         ))}
//       </select>

//       {/* Action checkboxes */}
//       <div className="mb-4">
//         <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Actions</p>
//         {possibleActions.map((action) => (
//           <label key={action} className="inline-flex items-center mr-4">
//             <input
//               type="checkbox"
//               checked={userActions.includes(action)}
//               onChange={() => toggleAction(action)}
//               className="mr-2"
//             />
//             {action}
//           </label>
//         ))}
//       </div>

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         disabled={!selectedUser}
//       >
//         Update Actions
//       </button>
//     </div>
//   );
// };

// export default SuperAdminActions;









'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const roles = ['Teacher', 'Student', 'Admin'];
const allActions = ['view', 'edit', 'delete'];

export default function RoleActionsPage() {
  const [selectedRole, setSelectedRole] = useState('Teacher');
  const [roleActions, setRoleActions] = useState<string[]>([]);

//   useEffect(() => {
//     // Fetch current actions for the selected role
//     const fetchActions = async () => {
//       try {
//         const response = await axios.get(`/api/v1/roles/${selectedRole.toLowerCase()}/actions`);
//         setRoleActions(response.data.actions);
//       } catch (error) {
//         console.error('Error fetching role actions:', error);
//       }
//     };
//     fetchActions();
//   }, [selectedRole]);

const token  = localStorage.getItem("token");

  const toggleAction = (action: string) => {
    setRoleActions((prevActions) =>
      prevActions.includes(action)
        ? prevActions.filter((a) => a !== action)
        : [...prevActions, action]
    );
  };

  const handleSubmit = async () => {
      try {
          //   await axios.post(`http://localhost:5000/api/v1/superadmin/roles/${selectedRole.toLowerCase()}`, 
          // {selectedRole, roleActions}
          // );
          // console.log("selectedRole:", selectedRole);
          
          let currentSelectedRole = selectedRole;
          currentSelectedRole = currentSelectedRole.toLowerCase();
    await axios.post(`http://localhost:5000/api/v1/superadmin/roles/${currentSelectedRole}`, 
    { actions : roleActions},{
        // headers: {
        // //   'Authorization': `Bearer ${token}` 
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        // }
        withCredentials: true,
      });

      alert('Actions assigned successfully to all users of this role.');
    } catch (error) {
      console.error('Error assigning actions:', error);
      alert('Failed to assign actions.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign Actions to Role</h1>
      <label className="block mb-2 font-semibold">Select Role:</label>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Actions:</label>
        <div className="flex gap-4">
          {allActions.map((action) => (
            <label key={action} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={roleActions.includes(action)}
                onChange={() => toggleAction(action)}
              />
              {action}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assign Actions
      </button>
    </div>
  );
}





















