import React from "react";

const EmployeeTable = ({ employees, onDelete, onEdit }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 1rem;
            text-align: left;
            border: 1px solid #ddd;
          }
          th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: center;
            white-space: nowrap; /* Prevents text wrapping */
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:hover {
            background-color: #f9f9f9;
          }
          button {
            margin: 5px;
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 1rem;
          }
          button:hover {
            background-color: #0056b3;
          }
          /* Responsive Design */
          @media (max-width: 768px) {
            table {
              font-size: 0.9rem;
            }
            th, td {
              padding: 10px;
            }
            button {
              font-size: 0.85rem;
              padding: 6px 10px;
            }
          }

          @media (max-width: 480px) {
            table {
              font-size: 0.8rem;
            }
            th, td {
              padding: 8px;
            }
            button {
              font-size: 0.75rem;
              padding: 5px 8px;
            }
          }
        `}
      </style>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) && employees.length > 0 ? (
            employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{new Date(employee.dob).toLocaleDateString()}</td>
                <td>{employee.age}</td>
                <td>{employee.salary}</td>
                <td>{employee.status ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => onEdit(employee)}>Edit</button>
                  <button onClick={() => onDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
