import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FetchStatuses } from "../../services/api/StatusesAPI/StatusesAPI";
import { Statuses } from "../../services/api/StatusesAPI/StatusesAPI.types";
import { updateTask } from "../../services/api/TasksAPI/TasksAPI";
import { Task, TaskPut } from "../../services/api/TasksAPI/TasksAPI.types";
import { fetchComments, createComment } from "../../services/api/Comments/Comments";
import { Comments, CommentPayload } from "../../services/api/Comments/Comments.styles";

// Define form types
interface CommentFormValues {
  comment?: string;
  reply?: string;
}

export const useTasksContainer = (task?: Task) => {
    const { register, handleSubmit, control, reset, setValue } = useForm<CommentFormValues>();
    const [statusesOptions, setStatusOptions] = useState<Statuses[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [comments, setComments] = useState<Comments[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [activeReplyInput, setActiveReplyInput] = useState<number | null>(null);
    
    // Track if we're replying to a main comment or subcomment
    const [isReplyingToSubcomment, setIsReplyingToSubcomment] = useState(false);

    useEffect(() => {
        const loadStatuses = async () => {
            setIsLoading(true);
            try {
                const data = await FetchStatuses();
                setStatusOptions(data);
            } catch (err) {
                console.error("Error fetching statuses:", err);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadStatuses();
    }, []);

    useEffect(() => {
        if (task?.id) {
            loadComments();
        }
    }, [task?.id]);

    const loadComments = async () => {
        if (!task?.id) return;
        
        setIsLoadingComments(true);
        try {
            const commentsData = await fetchComments(task.id);
            // Transform the data to ensure consistent property naming
            const formattedComments = commentsData.map(comment => ({
                ...comment,
                // Make sure we have a consistent property name for subcomments
                subcomments: comment.sub_comments || []
            }));
            setComments(formattedComments);
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setIsLoadingComments(false);
        }
    };

    const addComment = async (commentText: string, parentId: number | null = null) => {
        if (!task?.id || !commentText.trim()) return;
        
        setIsSubmittingComment(true);
        try {
            const commentPayload: CommentPayload = {
                id: 0, // The API will generate an ID
                text: commentText,
                task_id: task.id,
                parent_id: parentId,
            };
            
            await createComment(task.id, commentPayload);
            await loadComments();

            // Reset form - this is critical to clear the input after submission
            reset({ comment: '' });
            
        } catch (err) {
            console.error("Error creating comment:", err);
        } finally {
            setIsSubmittingComment(false);
        }
    };

    // Function to handle starting a reply to a comment
    const handleReplyClick = (commentId: number, isSubcomment = false) => {
        setReplyingTo(commentId);
        setActiveReplyInput(commentId);
        setIsReplyingToSubcomment(isSubcomment);
        
        // Clear any existing reply text
        setValue('reply', '');
    };

    // Function to cancel replying
    const cancelReply = () => {
        setReplyingTo(null);
        setActiveReplyInput(null);
        setIsReplyingToSubcomment(false);
        setValue('reply', '');
    };

    // Function to submit a reply - with proper typing
    const submitReply: SubmitHandler<CommentFormValues> = async (data) => {
        if (replyingTo !== null && data.reply && data.reply.trim()) {
            // Always pass the parent_id when replying
            await addComment(data.reply, replyingTo);
        }
    };

    const updateTaskStatus = async (statusId: number) => {
        if (!task?.id) {
            console.error("Task ID is undefined");
            return;
        }

        setIsUpdating(true);
        try {
            const taskData: TaskPut = {
                id: task.id,
                name: task.name,
                description: task.description,
                employee_id: task.employee.id,
                department_id: task.department.id,
                priority_id: task.priority.id,
                status_id: statusId, 
                due_date: task.due_date,
            };

            const updatedTask = await updateTask(task.id, taskData);
            console.log("Task updated:", updatedTask);
            return updatedTask;
        } catch (error) {
            console.error("Update error:", error);
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        register,
        handleSubmit,
        control,
        statusesOptions,
        isLoading,
        isUpdating,
        updateTaskStatus,
        comments,
        isLoadingComments,
        isSubmittingComment,
        addComment,
        loadComments,
        // New reply-related functions and state
        handleReplyClick,
        cancelReply,
        submitReply,
        replyingTo,
        activeReplyInput,
        isReplyingToSubcomment,
        reset,
        setValue
    };
};