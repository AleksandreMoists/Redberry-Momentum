import React from 'react';
import styles from './CreateTask.style.module.css';
import Typography from '../../components/Typography/Typography';
import { ControlledInput } from '../../components/CustomInput/CustomInput';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { priorities } from '../../utils/mockData';
import { departmentOptions } from '../MainPage/container';
import Button from '../../components/Button/Button';
import { useCreateTaskForm } from './container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

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
    handleEmployeeSelect,
    handleDateChange,
    employeeOptions,
    loadingEmployees,
    statusOptions,
    setValue
  } = useCreateTaskForm();

  return (
    <>
      <Typography variant="h1">შექმენი ახალი დავალება</Typography>
    
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <div className={styles.leftSide}>
              <ControlledInput
                name='name' // Changed from 'title' to match your schema
                label='სათაური*'
                control={control as any}
                type='text'
                validationState={validationStates.name} // Changed from 'title' to match your schema
                charCount={charCount?.name}
              />
              <ControlledInput
                name='description'
                label='აღწერა*'
                control={control as any}
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
                  options={priorities}
                  type='radio'
                  onSelect={handlePrioritySelect}
                  variant='task'
                  placeholder='აირჩიე პრიორიტეტი'
                />
                
                <Dropdown
                  id="create-task-employees"
                  label="თანამშრომელი"
                  options={loadingEmployees ? [{id: 0, name: "Loading..."}] : employeeOptions}
                  onSelect={handleEmployeeSelect}
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
                  id='statuses'
                  label='სტატუსი'
                  options={statusOptions}
                  type='radio'
                  onSelect={handleStatusSelect}
                  variant='task'
                  placeholder='აირჩიე სტატუსი'
                />
              </div>
              <div className={styles.dateStyle}>
                <Typography variant="caption">დედლაინის თარიღი</Typography>
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
              disabled={isSubmitting}
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