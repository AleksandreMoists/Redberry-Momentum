import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../services/api/TasksAPI/TasksAPI';
import { fetchEmployees } from '../../services/api/EmployeesAPI/Employees';
import { TaskPost } from '../../services/api/TasksAPI/TasksAPI.types';
import { Employee } from '../../services/api/EmployeesAPI/EmployeesAPI.types';
import { FetchStatuses } from '../../services/api/StatusesAPI/StatusesAPI';
import { Statuses } from '../../services/api/StatusesAPI/StatusesAPI.types';

const TASK_FORM_CACHE_KEY = 'momentum_task_form_data';

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

const getCachedFormData = (): Partial<TaskFormValues> => {
  try {
    const cachedData = localStorage.getItem(TASK_FORM_CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      
      if (parsed.due_date) {
        parsed.due_date = new Date(parsed.due_date);
      }
      
      return parsed;
    }
  } catch (err) {
    console.error('Error loading cached form data:', err);
  }
  return {};
};

const saveFormDataToCache = (data: Partial<TaskFormValues>) => {
  try {
    const dataToSave = { ...data };
    localStorage.setItem(TASK_FORM_CACHE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error('Error saving form data to cache:', err);
  }
};

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
  const [isEmployeeDropdownDisabled, setIsEmployeeDropdownDisabled] = useState(true);

  const cachedFormData = useMemo(() => getCachedFormData(), []);

  const { control, handleSubmit, reset, watch, setValue, getValues, formState: { errors, isValid, isDirty } } = useForm<TaskFormValues>({
    resolver: yupResolver(taskSchema),
    mode: 'onChange',
    defaultValues: {
      name: cachedFormData.name || '',
      description: cachedFormData.description || '',
      employee_id: cachedFormData.employee_id || (undefined as unknown as number),
      department_id: cachedFormData.department_id || null,
      priority_id: cachedFormData.priority_id || (undefined as unknown as number),
      status_id: cachedFormData.status_id || 1,
      due_date: cachedFormData.due_date || null,
    }
  });

  useEffect(() => {
    const subscription = watch((formData) => {
      saveFormDataToCache(formData as Partial<TaskFormValues>);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const name = watch('name');
  const description = watch('description');
  const employeeId = watch('employee_id');
  const priorityId = watch('priority_id');

  // Compute form validity
  const isFormValid = useMemo(() => {
    return Boolean(
      name?.length >= 2 &&
      description?.length >= 2 &&
      employeeId &&
      priorityId &&
      !Object.keys(errors).length
    );
  }, [name, description, employeeId, priorityId, errors]);

  const selectedDepartmentId = watch('department_id');
  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoadingEmployees(true);
        const employeeData = await fetchEmployees();
        setEmployees(employeeData);
      } catch (err) {
        console.error('Failed to fetch employees:', err);
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
  
  useEffect(() => {
    if (selectedDepartmentId) {
      setIsEmployeeDropdownDisabled(false);
      
      const currentEmployeeId = getValues('employee_id');
      if (currentEmployeeId) {
        const employeeExists = employees.some(
          emp => emp.id === currentEmployeeId && Number(emp.department.id) === selectedDepartmentId
        );
        
        if (!employeeExists) {
          setValue('employee_id', undefined as unknown as number);
        }
      }
    } else {
      setIsEmployeeDropdownDisabled(true);
      setValue('employee_id', undefined as unknown as number);
    }
  }, [selectedDepartmentId, employees, setValue, getValues]);

  const filteredEmployeeOptions = useMemo(() => {
    if (!selectedDepartmentId) return [];
    
    return employees
      .filter(employee => Number(employee.department.id) === selectedDepartmentId)
      .map(employee => ({
        id: employee.id,
        name: `${employee.name} ${employee.surname}`
      }));
  }, [employees, selectedDepartmentId]);

  const employeeOptions = employees.map(employee => ({
    id: employee.id,
    name: `${employee.name} ${employee.surname}`
  }));

  const statusOptions = statuses.map(status => ({
    id: status.id,
    name: status.name
  }));
  
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
      
      // Clear cache on successful submission
      localStorage.removeItem(TASK_FORM_CACHE_KEY);
      
      reset();
      navigate('/');
      
    } catch (err: any) {
      setError(err?.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
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
    employeeOptions: filteredEmployeeOptions,
    loadingEmployees, 
    statusOptions,
    loadingStatuses,
    isEmployeeDropdownDisabled,
    charCount: {
      name: nameVal?.length || 0,
      description: descriptionVal?.length || 0
    },
    isFormValid,
  };
};

export type { TaskFormValues, ValidationState };