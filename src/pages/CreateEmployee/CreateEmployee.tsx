  import React from 'react';
  import Typography from '../../components/Typography/Typography';
  import Button from '../../components/Button/Button';
  import styles from './CreateEmployee.style.module.css';
  import { XSvg } from '../../assets/SVG/XSvg';
  import { ControlledInput } from '../../components/CustomInput/CustomInput';
  import { Dropdown } from '../../components/Dropdown/Dropdown';
  import { useCreateEmployeeForm } from './container';
  import AvatarUpload from '../../components/AvatarUpload/AvatarUpload';

  interface CreateEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (employeeData: any) => void;
  }

  const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ 
    isOpen, 
    onClose,
    onSubmit
  }) => {
    const {
      control,
      handleSubmit,
      onSubmit: containerOnSubmit, // Renamed to avoid confusion
      isSubmitting,
      error,
      validationStates,
      charCount,
      handleDepartmentSelect,
      departmentOptions,
      loadingDepartments,
      selectedAvatar,
      handleAvatarSelect
    } = useCreateEmployeeForm();

    // Define a submit handler that combines the container's onSubmit with the prop's onSubmit
    const handleFormSubmit = handleSubmit(async (formData) => {
      try {
        console.log(formData)
        // First call the container's onSubmit to process the data
        const result = await containerOnSubmit(formData);
        
        // If successful and we have an onSubmit prop, call it with the form data
        if (result && onSubmit) {
          onSubmit(formData);
        }
        
        // If successful, close the modal
        if (result) {
          onClose();
        }
        
        return result;
      } catch (error) {
        console.error('Error submitting form:', error);
        return false;
      }
    });

    if (!isOpen) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.closeButton} onClick={onClose}>
            <XSvg />
          </div>
          <div className={styles.modalHeader}>
            <Typography variant="h1">თანამშრომლის შექმნა</Typography>
          </div>
          
          {/* Use onSubmit to properly handle form submission */}
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputRow}>
              <div className={styles.inputRow}>
                <div className={styles.inputContainer}>
                  <ControlledInput
                    name='name'
                    label='სახელი*'
                    control={control as any}
                    type='text'
                    validationState={validationStates.name}
                    charCount={charCount?.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        border: '1px solid #CED4DA',
                      }
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <ControlledInput
                    name='surname'
                    label='გვარი*'
                    control={control as any}
                    type='text'
                    validationState={validationStates.surname}
                    charCount={charCount?.surname}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        border: '1px solid #DEE2E6',
                      }
                    }}
                  />
                  </div>
                </div>
            </div>
            </div>
            
            <div className={styles.formGroup}>
              <AvatarUpload 
                onAvatarSelect={handleAvatarSelect} 
                selectedAvatar={selectedAvatar} 
              />
            </div>

            <div className={styles.dropdown}>
              <Dropdown
                id='departments'
                label='დეპარტამენტი*'
                options={departmentOptions}
                type='radio'
                onSelect={handleDepartmentSelect}
                variant='employee'
                placeholder={loadingDepartments ? 'იტვირთება...' : 'აირჩიე დეპარტამენტი'}
              />
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <Typography variant="caption">{error}</Typography>
              </div>
            )}

            <div className={styles.buttonGroup}>
              <Button 
                type="button" 
                variant="outlined" 
                color="secondary" 
                onClick={onClose}
              >
                გაუქმება
              </Button>
              <Button 
                type="submit" // Changed to submit type
                variant="primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'იტვირთება...' : 'შექმნა'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default CreateEmployeeModal;