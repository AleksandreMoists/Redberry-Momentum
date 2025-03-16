import apiClient from "../api";
import { Task } from "./TasksAPI.types";
  
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