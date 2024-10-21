import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import { getEmployees, deleteEmployee } from "../utils/api";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data.body);
  };

  const handleDelete = async id => {
    await deleteEmployee(id);
    loadEmployees();
  };

  const handleEdit = employee => {
    setSelectedEmployee(employee);
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
    setSelectedEmployee(null);
    loadEmployees();
  };

  return (
    <div>
      <style>{`
        h1 {
          text-align: center;
          color: #333;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        button:hover {
          background-color: #45a049;
        }
        .employee-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .employee-table th, .employee-table td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .employee-table th {
          background-color: #f2f2f2;
          color: black;
        }
        .employee-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .employee-table tr:hover {
          background-color: #ddd;
        }
      `}</style>
      <h1>Employee Management</h1>
      <button onClick={() => setFormVisible(true)}>Add Employee</button>
      {isFormVisible && (
        <EmployeeForm employee={selectedEmployee} onClose={handleFormClose} />
      )}
      <EmployeeTable
        employees={employees}
        onDelete={handleDelete}
        onEdit={handleEdit}
        className="employee-table"
      />
    </div>
  );
};

export default EmployeeList;
