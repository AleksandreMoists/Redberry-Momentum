// api.ts
import axios from 'axios';
import { Task } from './TasksAPI/TasksAPI.types';

// Base URL for the API
const BASE_URL = 'https://momentum.redberryinternship.ge/scalar';

export const getTasks = async (): Promise<Task[]> => {
  try {
    // The documented endpoint is "/tasks". Adjust if needed.
    const response = await axios.get<Task[]>(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
