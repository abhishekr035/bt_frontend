import React, { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../utils/api";

const EmployeeForm = ({ employee, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    salary: "",
    status: false,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        dob: new Date(employee.dob).toISOString().split("T")[0],
      });
    }
  }, [employee]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (employee) {
      await updateEmployee(formData);
    } else {
      await addEmployee(formData);
    }
    onClose();
  };

  return (
    <div className="form-container">
      <style>{`
        .form-container {
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h2 {
          text-align: center;
          color: #333;
        }
        div {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input[type="text"],
        input[type="email"],
        input[type="date"],
        input[type="number"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        input[type="checkbox"] {
          margin-left: 5px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
