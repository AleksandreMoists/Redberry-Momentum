import React from 'react';
import styles from './CreateTask.style.module.css';
import Typography from '../../components/Typography/Typography';
import { ControlledInput } from '../../components/CustomInput/CustomInput';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { priorities } from '../../utils/mockData';
import Button from '../../components/Button/Button';
import { useCreateTaskForm } from './container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { departmentOptions } from '../MainPage/container';

const CreateTaskPage: React.FC = () => {
  const { 
    control, 
    handleSubmit, 
    onSubmit, 
    isSubmitting, 
    error,
    validationStates,
    charCount,
    handleDepartmentSelect,
    handlePrioritySelect,
    handleStatusSelect,
    handleDateChange,
    statusOptions,
    setValue,
    employeeOptions,
    loadingEmployees,
    isEmployeeDropdownDisabled,
    handleEmployeeSelect,
    isFormValid
  } = useCreateTaskForm();

  return (
    <>
      <Typography variant="h1">Create New Task</Typography>
    
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <div className={styles.leftSide}>
              <ControlledInput
                name='name' // Changed from 'title' to match your schema
                label='Title*'
                control={control as any}
                type='text'
                validationState={validationStates.name} // Changed from 'title' to match your schema
                charCount={charCount?.name}
                sx={{
                  border: '1px solid #DEE2E6',
                }}
              />
              <ControlledInput
                name='description'
                label='Description*'
                control={control as any}
                type='text'
                multiline={true}
                rows={4}
                validationState={validationStates.description}
                charCount={charCount?.description}
                sx={{
                  border: '1px solid #DEE2E6',
                }}
              />
              <div className={styles.dropdowns}>
                <Dropdown
                  id='priorities'
                  label='Priority*'
                  options={priorities}
                  type='radio'
                  onSelect={handlePrioritySelect}
                  variant='task'
                  placeholder='Choose Priority'
                  defaultSelected={[{id: 2, name: "საშუალო",}]}
                />
                
                <Dropdown
                  id='statuses'
                  label='Status*'
                  options={statusOptions}
                  type='radio'
                  onSelect={handleStatusSelect}
                  variant='task'
                  placeholder='Choose Status'
                />
              </div>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.dropdownStyle}>
                <Dropdown 
                  id='departments'
                  label='Department*'
                  options={departmentOptions}
                  type='radio'
                  onSelect={handleDepartmentSelect}
                  variant='task'
                  placeholder='Choose Department'
                />
                <Dropdown
                  id="create-task-employees"
                  label="Responsible Employee*"
                  options={loadingEmployees ? [{id: 0, name: "Loading..."}] : employeeOptions}
                  onSelect={handleEmployeeSelect}
                  type="radio"
                  variant='task'
                  placeholder='Choose Employee'
                  disabled={isEmployeeDropdownDisabled} // Pass the disabled state here
                  />
              </div>
              <div className={styles.dropdownStyle}>
              </div>
              <div className={styles.dateStyle}>
                <Typography variant="caption">Deadline Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date) => handleDateChange(date ? date.toDate() : null)}
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
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant='primary'
              disabled={!isFormValid || isSubmitting}
              style={{ fontFamily: 'FiraGO', fontSize: '18px', fontWeight: 400 }}
            >
              {isSubmitting ? 'დავალების შექმნა...' : 'დავალების შექმნა'}
            </Button>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateTaskPage;