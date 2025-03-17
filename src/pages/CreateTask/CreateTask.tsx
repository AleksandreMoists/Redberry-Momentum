import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import styles from './CreateTask.style.module.css';
import Typography from '../../components/Typography/Typography';
import { ControlledInput } from '../../components/CustomInput/CustomInput';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { priorityOptions } from '../../services/enums/apiEnums';
import { departmentOptions } from '../MainPage/container';
import Button from '../../components/Button/Button';
import { useCreateTaskForm } from './container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

const CreateTaskPage: React.FC = () => {
    const isFirstMount = useRef(true);
    
    const location = useLocation();
    const formState = location.state?.formData || {};
    
    const navigate = useNavigate();
    const { 
        control, 
        handleSubmit, 
        onSubmit, 
        isSubmitting, 
        error,
        reset,
        validationStates,
        charCount,
        handleDepartmentSelect,
        handlePrioritySelect,
        handleStatusSelect,
        handleEmployeeSelect,
        watch,
        handleDateChange,
        setValue,
        getValues,
        employeeOptions, 
        loadingEmployees,
        statusOptions,
        loadingStatuses
    } = useCreateTaskForm();

    useEffect(() => {
        // Only run form restoration logic on first mount
        if (isFirstMount.current) {
            // Restore from router state
            if (formState && Object.keys(formState).length > 0) {
                Object.entries(formState).forEach(([key, value]) => {
                    setValue(key as any, value);
                });
            } else {
                // If no router state, try sessionStorage
                const savedData = sessionStorage.getItem('create_task_form');
                if (savedData) {
                    try {
                        const parsedData = JSON.parse(savedData);
                        Object.entries(parsedData).forEach(([key, value]) => {
                            setValue(key as any, value);
                        });
                    } catch (err) {
                        console.error('Error parsing saved form data', err);
                    }
                }
            }
            
            // Mark that first mount is complete
            isFirstMount.current = false;
        }

        // Setup the beforeunload event listener
        const handleBeforeUnload = () => {
            const currentValues = getValues();
            if (Object.keys(currentValues).some(key => !!currentValues[key as keyof typeof currentValues])) {
                sessionStorage.setItem('create_task_form', JSON.stringify(currentValues));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
        // No dependencies here - we control execution with isFirstMount ref
    }, []);

    // Add function to handle programmatic navigation with form state
    const handleNavigate = (path: string) => {
        const currentValues = getValues();
        navigate(path, { state: { formData: currentValues } });
    };

    return (
        <>
            <Typography variant="h1">შექმენი ახალი დავალება</Typography>
        
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputContainer}>
                        <div className={styles.leftSide}>
                            <ControlledInput
                                name='name'  // Changed from 'title' to 'name' to match schema
                                label='სათაური*'
                                control={control}
                                type='text'
                                validationState={validationStates.name}  // Changed from 'title' to 'name'
                                charCount={charCount?.name}  // Changed from 'title' to 'name'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        border: '1px solid #DEE2E6',
                                    }
                                }}
                            />
                            <ControlledInput
                                name='description'
                                label='აღწერა*'
                                control={control}
                                type='text'
                                multiline={true}
                                rows={4}
                                validationState={validationStates.description}
                                charCount={charCount?.description}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        border: '1px solid #DEE2E6',
                                    }
                                }}
                            />
                            <div className={styles.dropdowns}>
                                <Dropdown
                                    id='priorities'
                                    label='პრიორიტეტი'
                                    options={priorityOptions}
                                    type='radio'
                                    onSelect={handlePrioritySelect}
                                    variant='task'
                                    placeholder='აირჩიე პრიორიტეტი'
                                />
                                
                                <Dropdown
                                    id="create-task-employees"
                                    label="სტატუსი"
                                    options={statusOptions} 
                                    onSelect={handleEmployeeSelect}
                                    type="radio"
                                    variant='task'
                                    placeholder={loadingEmployees ? 'იტვირთება...' : 'აირჩიე თანამშრომელი'}
                                />
                            </div>
                        </div>

                        <div className={styles.rightSide}>
                            <div className={styles.dropdownStyle}>
                                <Dropdown 
                                    id='departments'
                                    label='დეპარტამენტი'
                                    options={departmentOptions}
                                    type='radio'
                                    onSelect={handleDepartmentSelect}
                                    variant='task'
                                    placeholder='აირჩიე დეპარტამენტი'
                                />
                            </div>
                            <div className={styles.dropdownStyle}>
                                <Dropdown
                                    id='employees'
                                    label='პასუხისმგებელი თანამშრომელი'
                                    options={employeeOptions} // Use the fetched employee options
                                    type='radio'
                                    onSelect={handleEmployeeSelect}
                                    variant='task'
                                    placeholder={loadingEmployees ? 'იტვირთება...' : 'აირჩიე თანამშრომელი'}
                                    // disabled={loadingEmployees} // Disable dropdown while loading
                                />
                            </div>
                            <div className={styles.dateStyle}>
                                <Typography variant="caption">დედლაინის თარიღი</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={watch('due_date') ? dayjs(watch('due_date')) : null}
                                        onChange={(date) => handleDateChange(date?.toDate() || null)}
                                        sx={{
                                            background: "#FFFFFF",
                                            marginTop: "8px",
                                            width: "318px",
                                            height: "45px",
                                            borderRadius: "5px",
                                            '& .MuiInputBase-root': {
                                                height: '45px',
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            
                            {/* Move button inside rightSide */}
                            <div className={styles.buttonContainer}>
                                <Button
                                    type="submit"
                                    variant='primary'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'დავალების შექმნა...' : 'დავალების შექმნა'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Keep error message outside */}
                    {error && (
                        <div className={styles.errorContainer}>
                            <Typography variant="caption">{error}</Typography>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default CreateTaskPage;