import axios from "axios";
import apiClient from "../api";
import { Employee, EmployeePost } from "./EmployeesAPI.types";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
      headers: {
        Authorization: `Bearer 9e6e183c-aced-455d-902c-fb6eba59124b`
      },
  })
    return response.data;
};

export const createEmployee = async (employeeData: FormData) => {
  try {
    console.log("Creating employee with FormData");
    const response = await apiClient.post('/employees', employeeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create employee:", error);
    throw error;
  }
};
