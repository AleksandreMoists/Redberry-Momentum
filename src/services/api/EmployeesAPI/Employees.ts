import apiClient from "../api";
import { Employee, EmployeePost } from "./EmployeesAPI.types";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>("/employees");
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
