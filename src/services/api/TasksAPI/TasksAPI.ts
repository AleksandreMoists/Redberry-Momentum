import apiClient from "../api";
import { Task } from "./TasksAPI.types";


interface TaskPayload {
  name: string;
  description: string;
  employee_id?: number | null;
  department_id?: number | null;
  priority_id: number;
  status_id?: number;
  due_date?: string | null;
}
  
  export const fetchTasks = async (): Promise<Task[]> => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
  
  export const fetchTaskById = async (id: number): Promise<Task> => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  }

  export const createTask = async (task: TaskPayload): Promise<TaskPayload> => {
    try {
      const response = await apiClient.post('/tasks', task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }