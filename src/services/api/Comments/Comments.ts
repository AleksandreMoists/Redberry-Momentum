import axios from "axios";
import { Comments, CommentPayload } from "./Comments.styles";

export const fetchComments = async (taskId: number): Promise<Comments[]> => {
  try {
    const response = await axios.get(
      `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
      {
        headers: {
          Authorization: `Bearer 9e6e183c-aced-455d-902c-fb6eba59124b`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export const createComment = async (taskId: number, comment: CommentPayload): Promise<CommentPayload> => {
  try {
    const response = await axios.post(
      `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`, 
      comment, 
      {
        headers: {
          Authorization: 'Bearer 9e6e183c-aced-455d-902c-fb6eba59124b'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}
