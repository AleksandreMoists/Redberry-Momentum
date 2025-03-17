import apiClient from "../api";
import { Employee } from "./EmployeesAPI.types";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>("/employees");
    return response.data;
};