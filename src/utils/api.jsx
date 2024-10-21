const API_URL = "http://localhost:8080/employee";

export const getEmployees = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addEmployee = async employee => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return response.json();
};

export const updateEmployee = async employee => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return response.json();
};

export const deleteEmployee = async id => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
