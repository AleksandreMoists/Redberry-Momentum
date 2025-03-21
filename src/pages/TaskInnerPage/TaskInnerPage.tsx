import React, { useState } from "react";
import styles from './TaskInnerPage.style.module.css'
import Priority from "../../components/Priority/Priority";
import Department from "../../components/Department/Department";
import Typography from "../../components/Typography/Typography";
import { ControlledInput } from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import { useTasksContainer } from "./container";
import { formatDateGeorgian } from "../../utils/fortmattedDateGeorgian";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import LeftArrowSvg from "../../assets/SVG/LeftArrowSvg";

interface TaskInnerPageProps {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: {
        id: number;
        name: string;
    };
    priority: {
        id: number;
        name: string;
        icon: string;
    };
    department: {
        id: number;
        name: string;
    };
    employee: {
        id: number;
        name: string;
        surname: string;
        avatar: string;
        department_id: number;
    };
    total_comments: number;
}

const TaskInnerPage: React.FC<TaskInnerPageProps> = ({
    id,
    name, 
    description, 
    due_date, 
    status, 
    priority, 
    department, 
    employee, 
    total_comments
}) => {
   // Pass the entire task object to the hook
const { 
    control, 
    handleSubmit, 
    statusesOptions, 
    updateTaskStatus, 
    isUpdating,
    comments,
    isLoadingComments,
    isSubmittingComment,
    addComment,
    register,
    replyingTo,
    isReplyingToSubcomment,
    handleReplyClick,
    cancelReply,
    submitReply
} = useTasksContainer({ 
    id, 
    name, 
    description, 
    due_date, 
    status, 
    priority, 
    department, 
    employee, 
    total_comments 
});

    const formattedDueDate = formatDateGeorgian(due_date);

    // Initialize with the current status id
    const [selectedStatusId, setSelectedStatusId] = useState<number[]>([status.id]);
    
    // Handle status changes and call the API
    const handleStatusChange = async (selectedItems: number[]) => {
        setSelectedStatusId(selectedItems);
        
        // Update the status via API if a value is selected
        if (selectedItems.length > 0) {
            try {
                await updateTaskStatus(selectedItems[0]);
                // You could show a success notification here
            } catch (error) {
                // You might want to revert the selection in case of error
                setSelectedStatusId([status.id]);
            }
        }
    };
    
    // Update the onSubmitComment function to prevent default form behavior
    const onSubmitComment = handleSubmit((data, event) => {
        // Prevent the form from causing a page refresh
        event?.preventDefault();
        
        if (data.comment && data.comment.trim()) {
            addComment(data.comment);
        }
    });
    
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.taskInfo}>
                    <div className={styles.priorityDepartment}>
                        <Priority
                            id={priority.id}
                            name={priority.name}
                            icon={priority.icon}
                        />
                        <Department
                            id={department.id}
                            name={department.name}
                        />
                    </div>
                    <div className={styles.taskDescription}>
                        <Typography variant="h1">{name}</Typography>
                        <Typography variant="caption">{description}</Typography>
                    </div>
                </div>
                <div className={styles.taskDetails}>
                    <Typography variant="subtitle">დავალების დეტალები</Typography>
                    <div className={styles.taskDetailGroup}>
                        <Typography variant="caption">სტატუსი</Typography>
                        <Dropdown 
                            id="statuses"
                            options={statusesOptions}
                            type="radio"
                            onSelect={handleStatusChange}
                            externalSelected={selectedStatusId}
                            variant="task"
                            placeholder="აირჩიეთ სტატუსი"
                            autoClose={true}
                            disabled={isUpdating} // Disable during status update
                        />
                        {isUpdating && <Typography variant="caption">მიმდინარეობს განახლება...</Typography>}
                    </div>
                    <div className={styles.taskDetailGroup}>
                        <Typography variant="caption">თანამშრომელი</Typography>
                        <Typography variant="h2">{employee.name} {employee.surname}</Typography>
                    </div>
                    <div className={styles.taskDetailGroup}>
                        <Typography variant="caption">დასრულების თარიღი</Typography>
                        <Typography variant="h2">{formattedDueDate}</Typography>
                    </div>
                </div>
            </div>

            <div className={styles.rightSide}>
                <form onSubmit={onSubmitComment} className={styles.commentContainer}>
                    <ControlledInput
                        control={control}
                        name="comment"
                        placeholder="დაწერე კომენტარი"
                        multiline={true}
                        rows={4}
                        sx={{ width: '100%' }}
                    />
                    <Button 
                        type="submit"
                        variant="primary" 
                        className={styles.commentButton}
                        disabled={isSubmittingComment}
                    >
                        {isSubmittingComment ? 'იგზავნება...' : 'დააკომენტარე'}
                    </Button>
                </form>

                <div className={styles.commentCount}>
                    <Typography variant="subtitle">კომენტარები</Typography>
                    <Typography variant="h3" className={styles.commentStyle}>
                        {isLoadingComments ? 'იტვირთება...' : (
                            comments.length + comments.flatMap(comment => comment.sub_comments || []).length
                        )}
                    </Typography>
                </div>

                <div className={styles.commentList}>
                    {isLoadingComments ? (
                        <Typography variant="caption">კომენტარები იტვირთება...</Typography>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className={styles.comment}>
                                <div className={styles.commentHeader}>
                                    {comment.author_avatar ? (
                                        <img 
                                            src={comment.author_avatar} 
                                            alt={comment.author_nickname} 
                                            className={styles.avatar}
                                        />
                                    ) : (
                                        <div className={styles.avatarPlaceholder}>
                                            {comment.author_nickname?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <div className={styles.user}>
                                        <Typography variant="subtitle">{comment.author_nickname}</Typography>
                                    </div>
                                </div>
                                
                                <div className={styles.commentContent}>
                                    <Typography variant="caption">{comment.text}</Typography>
                                </div>
                                
                                {/* Add reply button to main comment */}
                                <div className={styles.commentActions}>
                                    <Button 
                                        variant="text" 
                                        size="small"
                                        className={styles.commentAction}
                                        onClick={() => handleReplyClick(comment.id, false)}
                                        startIcon={<LeftArrowSvg />}
                                    >
                                        უპასუხე
                                    </Button>
                                </div>

                                {/* Reply form for main comment */}
                                {replyingTo === comment.id && !isReplyingToSubcomment && (
                                    <div className={styles.replyFormContainer}>
                                        <form onSubmit={handleSubmit(submitReply)}>
                                            <ControlledInput
                                                control={control}
                                                name="reply"
                                                placeholder="დაწერე პასუხი"
                                                multiline={true}
                                                rows={2}
                                                sx={{ width: '100%' }}
                                            />
                                            <div className={styles.replyActions}>
                                                <Button 
                                                    type="button"
                                                    variant="text" 
                                                    size="small"
                                                    onClick={cancelReply}
                                                >
                                                    გაუქმება
                                                </Button>
                                                <Button 
                                                    type="submit"
                                                    variant="primary" 
                                                    size="small"
                                                    disabled={isSubmittingComment}
                                                >
                                                    {isSubmittingComment ? 'იგზავნება...' : 'პასუხი'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                
                                {/* Render subcomments if any */}
                                {comment.sub_comments && comment.sub_comments.length > 0 && (
                                    <div className={styles.sub_comments}>
                                        {comment.sub_comments.map(subcomment => (
                                            <div key={subcomment.id} className={styles.subcomment}>
                                                <div className={styles.subcommentHeader}>
                                                    {subcomment.author_avatar ? (
                                                        <img 
                                                            src={subcomment.author_avatar} 
                                                            alt={subcomment.author_nickname} 
                                                            className={styles.avatar}
                                                        />
                                                    ) : (
                                                        <div className={styles.avatarPlaceholder}>
                                                            {subcomment.author_nickname?.charAt(0) || 'U'}
                                                        </div>
                                                    )}
                                                    <div className={styles.user}>
                                                        <Typography variant="subtitle">{subcomment.author_nickname}</Typography>
                                                    </div>
                                                </div>
                                                <div className={styles.subcommentContent}>
                                                    <Typography variant="caption">{subcomment.text}</Typography>
                                                </div>
                                                {/* No reply button for subcomments as requested */}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <Typography variant="caption">კომენტარები არ არის</Typography>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskInnerPage;