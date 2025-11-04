import React, { useEffect, useState } from "react";
import { SinginUserData } from "../../api/api";

export default function Singin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await SinginUserData();
      console.log(res)
      setUsers(res)
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">All Users</h2>
            <p className="text-sm text-gray-600">Accounts registered in the system</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchUsers}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-indigo-500 hover:bg-indigo-600 text-white font-medium focus:outline-none"
            >
              Refresh
            </button>

            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={() => {
                  if (!showPasswords) {
                    if (!confirm("Show passwords in plain text? This is insecure. Proceed?")) return;
                  }
                  setShowPasswords((s) => !s);
                }}
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="text-sm text-gray-700">Show passwords</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-black/5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-500">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Password
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user._id ?? idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role ?? "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {showPasswords ? (
                        <code className="font-mono text-sm break-all">{user.password}</code>
                      ) : (
                        <span className="tracking-wider">{maskPassword(user.password)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => downloadUser(user)}
                          className="px-3 py-1 rounded-md text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        >
                          Export
                        </button>
                        <button
                          onClick={() => navigator.clipboard?.writeText(JSON.stringify(user))}
                          className="px-3 py-1 rounded-md text-sm bg-gray-50 text-gray-700 hover:bg-gray-100"
                        >
                          Copy
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-3">Note: Showing passwords in plain text is insecure — prefer hashed passwords and avoid displaying them.</p>
      </div>
    </div>
  );
}

function maskPassword(pass) {
  if (!pass) return "-";
  if (pass.length <= 2) return "•".repeat(pass.length);
  const first = pass[0];
  const last = pass[pass.length - 1];
  return `${first}${"•".repeat(Math.max(3, pass.length - 2))}${last}`;
}

function downloadUser(user) {
  try {
    const blob = new Blob([JSON.stringify(user, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.username ?? "user"}-export.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to export user:", err);
  }
}