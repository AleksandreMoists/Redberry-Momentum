import apiClient from "../api";
import { Statuses } from "./StatusesAPI.types";

export const FetchStatuses = async (): Promise<Statuses[]> => {
    try {
        const response = await apiClient.get( `https://momentum.redberryinternship.ge/api/statuses`,
            {
              headers: {
                Authorization: `Bearer 9e6e183c-aced-455d-902c-fb6eba59124b`
              }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching statuses:', error);
        throw error;
    }
}