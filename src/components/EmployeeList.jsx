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
      <h1>Employee Management</h1>
      {employees.length > 0 ? (
        <>
          <button onClick={() => setFormVisible(true)}>Add Employee</button>
          {isFormVisible && (
            <EmployeeForm
              employee={selectedEmployee}
              onClose={handleFormClose}
            />
          )}
          <EmployeeTable
            employees={employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <div>
          <h2>No Employees Found</h2>
          <button onClick={() => setFormVisible(true)}>Add Employee</button>
          {isFormVisible && (
            <EmployeeForm
              employee={selectedEmployee}
              onClose={handleFormClose}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;


