// src/containers/CreateEmployee/container.ts
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createEmployee } from "../../services/api/EmployeesAPI/Employees";
import { fetchDepartments } from "../../services/api/DepartmentsAPI/DepartmentsAPI";


const employeeSchema = yup.object({
  name: yup.string()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .max(255, 'მაქსიმუმ 255 სიმბოლო')
    .required('სახელი აუცილებელია'),
  surname: yup.string()
  .min(2, 'მინიმუმ 2 სიმბოლო')
    .max(255, 'მაქსიმუმ 255 სიმბოლო')
    .required('გვარი აუცილებელია'),
    department_id: yup.number().required('დეპარტამენტი აუცილებელია'),
  avatar: yup.mixed<File>().required('ავატარი აუცილებელია').nullable(),
}).required();


export type EmployeeFormValues = yup.InferType<typeof employeeSchema>;
export type ValidationState = 'default' | 'error' | 'success';


export const useCreateEmployeeForm = () => {
  const { handleSubmit, control, setValue, watch, getValues, reset, formState: { errors } } = useForm<EmployeeFormValues>({
    resolver: yupResolver(employeeSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>();
  const [departmentOptions, setDepartmentOptions] = useState<any[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [validationStates, setValidationStates] = useState<Record<string, ValidationState>>({
    name: 'default',
    surname: 'default',
  });

  useEffect(() => {
    setLoadingDepartments(true);
    fetchDepartments()
      .then((depts) => setDepartmentOptions(depts))
      .catch((err) => console.error("Failed to fetch departments", err))
      .finally(() => setLoadingDepartments(false));
  }, []);

  const handleAvatarSelect = (file: File | null) => {
    setSelectedAvatar(file);
    setValue("avatar", file);
  };

  const handleDepartmentSelect = (selectedItems: number[]) => {
    if (selectedItems && selectedItems.length > 0) {
      setValue('department_id', selectedItems[0]); 
    } else {
      setValue('department_id', 0); 
    }
  };

  const onSubmit = async (data: EmployeeFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("department_id", data.department_id.toString());
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }
      const result = await createEmployee(formData);
      reset();
      return result;
    } catch (err: any) {
      setError(err.message || "Failed to create employee");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameVal = watch("name");
  const surnameVal = watch("surname");

  useEffect(() => {
    const nameValue = watch('name');
    const surnameValue = watch('surname');
    
    setValidationStates({
      name: errors.name ? 'error' : nameValue ? 'success' : 'default',
      surname: errors.surname ? 'error' : surnameValue ? 'success' : 'default'
    });
  }, [watch('name'), watch('surname'), errors.name, errors.surname]);

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    error,
    reset,
    validationStates,
    watch,
    getValues,
    setValue,
    handleDepartmentSelect,
    handleAvatarSelect,
    selectedAvatar,
    departmentOptions,
    loadingDepartments,
    charCount: {
      name: nameVal?.length || 0,
      surname: surnameVal?.length || 0,
    },
  };
};
