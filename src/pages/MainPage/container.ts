import React, { useState, useEffect } from "react";
import { useCallback } from 'react';
import { Task } from "../../services/api/TasksAPI/TasksAPI.types";
import { fetchTasks } from "../../services/api/TasksAPI/TasksAPI"
import { DepartmentId, departmentOriginalNameMap } from "../../services/enums/apiEnums";
import { cardData } from "../../utils/mockData"; // Import mock data for fallback
import { formatDateGeorgian } from "../../utils/fortmattedDateGeorgian";

export const departmentOptions = [
    { id: DepartmentId.HUMAN_RESOURCES, name: departmentOriginalNameMap[DepartmentId.HUMAN_RESOURCES] },
    { id: DepartmentId.TECHNOLOGY, name: departmentOriginalNameMap[DepartmentId.TECHNOLOGY] },
    { id: DepartmentId.FINANCE, name: departmentOriginalNameMap[DepartmentId.FINANCE] },
    { id: DepartmentId.SALES_MARKETING, name: departmentOriginalNameMap[DepartmentId.SALES_MARKETING] },
    { id: DepartmentId.ADMINISTRATION, name: departmentOriginalNameMap[DepartmentId.ADMINISTRATION] },
    { id: DepartmentId.LOGISTICS, name: departmentOriginalNameMap[DepartmentId.LOGISTICS] },
    { id: DepartmentId.MEDIA, name: departmentOriginalNameMap[DepartmentId.MEDIA] },
];

export interface TasksContainerState {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  filteredTasks: Task[];
  filterByStatus: (statusId: number | null) => void;
  filterByPriority: (priorityId: number | null) => void;
  filterByDepartment: (departmentId: number | null) => void;
  resetFilters: () => void;
}

export const useTasksContainer = (): TasksContainerState => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState({
    statusId: null as number | null,
    priorityId: null as number | null,
    departmentId: null as number | null
  });

  const formatTaskDates = (task: Task): Task => {
    return {
      ...task,
      due_date: task.due_date ? formatDateGeorgian(task.due_date) : task.due_date,
    };
  };

  const processTasksWithFormattedDates = (tasksArray: Task[]): Task[] => {
    return tasksArray.map(task => formatTaskDates(task));
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        
        const formattedTasks = processTasksWithFormattedDates(data);
        
        setTasks(formattedTasks);
        setFilteredTasks(formattedTasks);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
        
        console.log("Using mock data as fallback");
        const formattedMockTasks = processTasksWithFormattedDates(cardData as unknown as Task[]);
        setTasks(formattedMockTasks);
        setFilteredTasks(formattedMockTasks);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    // Skip filtering if there are no tasks
    if (tasks.length === 0) return;
    
    try {
      let result = [...tasks];
      
      if (filters.statusId !== null) {
        result = result.filter(task => task.status?.id === filters.statusId);
      }
      
      if (filters.priorityId !== null) {
        result = result.filter(task => task.priority?.id === filters.priorityId);
      }
      
      if (filters.departmentId !== null) {
        result = result.filter(task => task.department?.id === filters.departmentId);
      }
      
      setFilteredTasks(result);
    } catch (err) {
      console.error("Error filtering tasks:", err);
      // If filtering fails, reset to all tasks
      setFilteredTasks(tasks);
    }
  }, [tasks, filters.statusId, filters.priorityId, filters.departmentId]);

  // Filter functions - Connect with Dropdown in feature.
  const filterByStatus = useCallback((statusId: number | null) => {
    setFilters(prev => ({ ...prev, statusId }));
  }, []);

  const filterByPriority = useCallback((priorityId: number | null) => {
    setFilters(prev => ({ ...prev, priorityId }));
  }, []);

  const filterByDepartment = useCallback((departmentId: number | null) => {
    setFilters(prev => ({ ...prev, departmentId }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      statusId: null,
      priorityId: null,
      departmentId: null
    });
  }, []);

  return {
    tasks,
    loading,
    error,
    filteredTasks,
    filterByStatus,
    filterByPriority,
    filterByDepartment,
    resetFilters
  };
};