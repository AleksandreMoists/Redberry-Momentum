import axios from "axios";
import apiClient from "../api";
import { Department } from "./DepartmentAPI.types";

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await axios.get(`https://momentum.redberryinternship.ge/api/departments`, {
      headers: {
        Authorization: `Bearer 9e6e183c-aced-455d-902c-fb6eba59124b`
      }
    })
    console.log('Departments fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

