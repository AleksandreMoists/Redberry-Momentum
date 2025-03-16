import apiClient from "../api";
import { Department } from "./DepartmentAPI";

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await apiClient.get('/departments');
    console.log('Departments fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

