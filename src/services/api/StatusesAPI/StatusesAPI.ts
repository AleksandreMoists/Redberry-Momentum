import apiClient from "../api";
import { Statuses } from "./StatusesAPI.types";

export const FetchStatuses = async (): Promise<Statuses[]> => {
    try {
        const response = await apiClient.get('/statuses');
        return response.data;
    } catch (error) {
        console.error('Error fetching statuses:', error);
        throw error;
    }
}