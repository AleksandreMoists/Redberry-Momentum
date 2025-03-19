import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../services/api/TasksAPI/TasksAPI';
import { getEmployees } from '../../services/api/EmployeesAPI/Employees';
import { TaskPost } from '../../services/api/TasksAPI/TasksAPI.types';
import { Employee } from '../../services/api/EmployeesAPI/EmployeesAPI.types';
import { FetchStatuses } from '../../services/api/StatusesAPI/StatusesAPI';
import { Statuses } from '../../services/api/StatusesAPI/StatusesAPI.types';

const taskSchema = yup.object({
  name: yup.string()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .max(255, 'მაქსიმუმ 255 სიმბოლო')
    .required('სათაური აუცილებელია'),
  description: yup.string()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .max(255, 'მაქსიმუმ 255 სიმბოლო')
    .required('აღწერა აუცილებელია'),
  employee_id: yup.number().required('თანამშრომელი აუცილებელია'),
  department_id: yup.number().nullable(),
  priority_id: yup.number().required('პრიორიტეტი აუცილებელია'),
  status_id: yup.number().nullable(),
  due_date: yup.date()
    .nullable()
    .min(new Date(), 'დედლაინის თარიღი არ უნდა იყოს წარსულში'),
}).required();

type TaskFormValues = yup.InferType<typeof taskSchema>;
type ValidationState = 'default' | 'error' | 'success';

export const useCreateTaskForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationStates, setValidationStates] = useState<Record<string, ValidationState>>({
    name: 'default',
    description: 'default',
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [statuses, setStatuses] = useState<Statuses[]>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoadingEmployees(true);
        const employeeData = await getEmployees();
        setEmployees(employeeData);
      } catch (err) {
        console.error('Failed to fetch employees:', err);
        setEmployees([
          { id: 1, name: 'Employee 1', surname: 'Surname', department_id: 1 },
          { id: 2, name: 'Employee 2', surname: 'Surname', department_id: 1 }
        ]);
      } finally {
        setLoadingEmployees(false);
      }
    };
    
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoadingStatuses(true);
        const statusData = await FetchStatuses();
        setStatuses(statusData);
      } catch (err) {
        console.error('Failed to fetch employees:', err);
      } finally {
        setLoadingStatuses(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  const employeeOptions = employees.map(employee => ({
    id: employee.id,
    name: `${employee.name} ${employee.surname}`
  }));

  const statusOptions = statuses.map(status => ({
    id: status.id,
    name: status.name
  }));


  const { control, handleSubmit, reset, watch, setValue, getValues, formState: { errors } } = useForm<TaskFormValues>({
    resolver: yupResolver(taskSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      employee_id: undefined as unknown as number,
      department_id: null,
      priority_id: undefined as unknown as number,
      status_id: 1,
      due_date: null,
    },
    shouldUnregister: false,
  });
  
  useEffect(() => {
    const nameValue = watch('name');
    const descriptionValue = watch('description');
    
    setValidationStates({
      name: errors.name ? 'error' : nameValue ? 'success' : 'default',
      description: errors.description ? 'error' : descriptionValue ? 'success' : 'default'
    });
    
  }, [watch, errors.name, errors.description]);

  const handleDepartmentSelect = (selectedItems: number[]) => {
    if (selectedItems && selectedItems.length > 0) {
      setValue('department_id', selectedItems[0]);
    } else {
      setValue('department_id', null);
    }
  };

  const handlePrioritySelect = (selectedItems: number[]) => {
    if (selectedItems && selectedItems.length > 0) {
      setValue('priority_id', selectedItems[0]);
    } else {
      setValue('priority_id', undefined as unknown as number);
    }
  };

  const handleStatusSelect = (selectedItems: number[]) => {
    if (selectedItems && selectedItems.length > 0) {
      setValue('status_id', selectedItems[0]);
    } else {
      setValue('status_id', 1); // Default to status 1
    }
  };

  const handleEmployeeSelect = (selectedItems: number[]) => {
    if (selectedItems && selectedItems.length > 0) {
      setValue('employee_id', selectedItems[0]);
    } else {
      setValue('employee_id', undefined as unknown as number);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setValue('due_date', date);
  };

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const taskPayload: TaskPost = {
        name: data.name,
        description: data.description,
        employee_id: data.employee_id,
        department_id: data.department_id || null,
        priority_id: data.priority_id,
        status_id: data.status_id || 1,
        due_date: data.due_date ? new Date(data.due_date).toISOString() : null
      };
      
      await createTask(taskPayload);
      
      reset();
      
      
    } catch (err: any) {
    }
  };

  const nameVal = watch('name');
  const descriptionVal = watch('description');

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    error,
    reset,
    validationStates,
    watch,
    handleDepartmentSelect,
    handlePrioritySelect,
    handleStatusSelect,
    handleEmployeeSelect,
    handleDateChange,
    getValues,
    setValue, 
    employeeOptions, 
    loadingEmployees, 
    statusOptions,
    loadingStatuses,
    charCount: {
      name: nameVal?.length || 0,
      description: descriptionVal?.length || 0
    }
  };
};

export type { TaskFormValues, ValidationState };