import React, { useState } from "react";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Sanjai", email: "sanjai@gmail.com", status: "Active" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", status: "Blocked" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    if (editId) {
      setUsers(
        users.map((u) =>
          u.id === editId ? { ...u, ...newUser } : u
        )
      );
      setEditId(null);
    } else {
      setUsers([
        ...users,
        { id: Date.now(), ...newUser, status: "Active" },
      ]);
    }

    setNewUser({ name: "", email: "" });
  };

  const handleEdit = (user) => {
    setNewUser({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
  };

  return (
    <>
      <h2>User Management</h2>

      <div className="user-form">
        <input
          type="text"
          placeholder="Enter name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({ ...newUser, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Enter email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
          }
        />

        <button onClick={handleAddUser}>
          {editId ? "Update" : "Add User"}
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <span
                  className={
                    u.status === "Active"
                      ? "status active"
                      : "status blocked"
                  }
                >
                  {u.status}
                </span>
              </td>

              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
                <button onClick={() => toggleStatus(u.id)}>
                  {u.status === "Active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;