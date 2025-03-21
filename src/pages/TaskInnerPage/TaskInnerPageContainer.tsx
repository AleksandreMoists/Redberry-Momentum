import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import TaskInnerPage from './TaskInnerPage';
import { fetchTaskById } from '../../services/api/TasksAPI/TasksAPI';
import { Task } from '../../services/api/TasksAPI/TasksAPI.types';
import TaskInnerPage from './TaskInnerPage';

// Define task type if not already defined in TasksAPI.types
type TaskDetailType = {
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
};

const TaskInnerPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const taskData = await fetchTaskById(Number(id));
        setTask(taskData as TaskDetailType);
      } catch (err) {
        console.error("Error loading task:", err);
        setError(err instanceof Error ? err : new Error('Failed to fetch task'));
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading task details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="not-found-container">
        <p>Task not found. The requested task may have been deleted or doesn't exist.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <TaskInnerPage
      id={task.id}
      name={task.name}
      description={task.description}
      due_date={task.due_date}
      status={task.status}
      priority={task.priority}
      department={task.department}
      employee={task.employee}
      total_comments={task.total_comments}
    />
  );
};

export default TaskInnerPageContainer;
