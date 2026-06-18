import { useEffect, useState } from "react";
import {
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
} from "../services/groupService";

function GroupDashboard() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const response = await getGroups();
    setGroups(response.data);
  };

  const saveGroup = async () => {
  if (groupName.trim() === "") {
    alert("Group Name Required");
    return;
    setMessage(editId ? "Group updated successfully" : "Group added successfully");
  }

  try {
    if (editId) {
      await updateGroup(editId, { groupName });
      setEditId(null);
    } else {
      await addGroup({ groupName });
    }

    setGroupName("");
    loadGroups();

  } catch (error) {
    alert(error.response?.data || "Something went wrong");
  }
};

  const editGroup = (group) => {
    setEditId(group.groupId);
    setGroupName(group.groupName);
  };

  const removeGroup = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await deleteGroup(id);
    loadGroups();
    setMessage("Group deleted successfully");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Group Management Dashboard</h2>
      {message && (
          <div className="alert alert-success text-center">
            {message}
          </div>
        )}
        
        <div className="card p-3 mb-4">
        <h5 className="text-center">Total Groups : {groups.length}</h5>

        <div className="row mt-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={saveGroup}>
              {editId ? "Update Group" : "Add Group"}
            </button>
          </div>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Group Name</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {groups.map((group) => (
            <tr key={group.groupId}>
              <td>{group.groupId}</td>
              <td>{group.groupName}</td>
              <td>{group.isActive ? "Active" : "Inactive"}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => editGroup(group)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeGroup(group.groupId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupDashboard;