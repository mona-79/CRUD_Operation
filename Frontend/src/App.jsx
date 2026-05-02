import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://127.0.0.1:8000/users";

  // GET
  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE + UPDATE
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`${API}/${editId}`, { name, email });
      setEditId(null);
    } else {
      await axios.post(API, { name, email });
    }
    setName("");
    setEmail("");
    fetchUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  // EDIT
  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2> CRUD Operation</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}
        style={{
          backgroundColor: editId ? "Orange" : "blue",
          color: "white",
          padding: "6px 10px",
          border: "none",
          borderRadius: "5px",
          margin: "10px",
          cursor: "pointer"
        }}
        >
        {editId ? "Update" : "Add"}
      </button>

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}

          <button onClick={() => editUser(user)}
            style = {{ backgroundColor: "blue",
          color: "white",
          padding: "6px 10px",
          border: "none",
          borderRadius: "5px",
          margin: "10px",
          cursor: "pointer"}}>Edit</button>

          <button onClick={() => deleteUser(user.id)}
            style = {{ backgroundColor: "blue",
          color: "white",
          padding: "6px 10px",
          border: "none",
          borderRadius: "5px",
          margin: "10px",
          cursor: "pointer"}}>Delete</button>

            
        </div>
      ))}
    </div>
  );
}

export default App;