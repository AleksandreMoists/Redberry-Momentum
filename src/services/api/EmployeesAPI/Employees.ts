import apiClient from "../api";
import { Employee, EmployeePost } from "./EmployeesAPI.types";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>("/employees");
    return response.data;
};

export const createEmployee = async (employee: EmployeePost): Promise<EmployeePost> => {
    const respone = await apiClient.post<Employee>("/employees", employee);
    return respone.data;
}