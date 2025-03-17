import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateTask.style.module.css';
import Layout from '../../components/Layout/Layout';
import Typography from '../../components/Typography/Typography';
import { ControlledInput } from '../../components/CustomInput/CustomInput';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { priorityOptions } from '../../services/enums/apiEnums';
import { departmentOptions } from '../MainPage/container';
import Button from '../../components/Button/Button';
import { useCreateTaskForm } from './container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers';


const CreateTaskPage: React.FC = () => {
const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  
  const employees = [
    { id: 1, name: 'Employee 1' },
    { id: 2, name: 'Employee 2' },
    { id: 3, name: 'Employee 3' },
  ];
  
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ];
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
        handleAssigneeSelect
    } = useCreateTaskForm();

    return (
        <>
            <Typography variant="h1">შექმენი ახალი დავალება</Typography>
        
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputContainer}>
                        <div className={styles.leftSide}>
                            <ControlledInput
                                name='title'
                                label='სათაური*'
                                control={control}
                                type='text'
                                validationState={validationStates.title}
                                charCount={charCount?.title}
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
                                    label="თანამშრომელი"
                                    options={employees}
                                    onSelect={setSelectedEmployees}
                                    type="radio"
                                    variant='task'
                                    placeholder='აირჩიე თანამშრომელი'
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
                                    options={[{id:1, name:"CR7"}]}
                                    type='radio'
                                    onSelect={handleAssigneeSelect}
                                    variant='task'
                                    placeholder='აირჩიე თანამშრომელი'
                                    
                                />
                            </div>
                            <div className={styles.dateStyle}>
                                <Typography variant="caption">დედლაინის თარიღი</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        sx={{
                                            background: "#FFFFFF",
                                            marginTop: "8px",
                                            width: "318px",
                                            borderRadius: "5px",
                                            '& .MuiInputBase-root': {
                                                height: '45px'
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                                <div className={styles.buttonContainer}>
                        <Button
                            type="submit"
                            variant='primary'
                            disabled={isSubmitting}
                            style={{ fontFamily: 'FiraGO', fontSize: '18px', fontWeight: 400 }}
                        >
                            {isSubmitting ? 'დავალების შექმნა...' : 'დავალების შექმნა'}
                        </Button>
                    </div>
                            </div>
                        </div>
                    </div>

                    {error && <p className={styles.errorText}>{error}</p>}

                </form>
            </div>
        </>
    );
};

export default CreateTaskPage;