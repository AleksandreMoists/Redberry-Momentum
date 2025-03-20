import React from "react";
import { Input, InputLabel, FormHelperText, FormControlLabel, Checkbox, Radio, } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ControlledInputProps, TextInputProps } from "./CustomInput.types";
import styles from "./CustomInput.style.module.css";
import Typography from "../Typography/Typography";

export const TextInput = React.memo(
  ({ 
    value,
    label,
    type = "text",                                
    disabled = false,
    errorMessage,
    fullWidth = false,
    className,
    style,
    onChange,
    validationState,
    charCount,
    sx,
    multiline = false,
    rows,
    ...props 
  }: TextInputProps) => {
    const renderInput = () => {
        switch(type) {
            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={value === 'true'}
                                onChange={(e) => onChange?.(e.target.checked.toString())}
                                disabled={disabled}
                            />
                        }
                        label={label}
                    />
                );
            case 'radio':
                return(
                    <FormControlLabel
                        control={
                            <Radio
                                checked={value === 'true'}  
                                onChange={(e) => onChange?.(e.target.checked.toString())}
                                disabled={disabled} 
                            />
                        }
                        label={label}
                    />
                );
            default: 
                return(
                      <div className={styles.inputContainer}>
                        {label && <Typography variant="subtitle">{label}</Typography>}
                        <Input
                            type={type}
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                            disabled={disabled}
                            fullWidth={fullWidth}
                            error={!!errorMessage}
                            className={`${multiline ? styles.textArea : styles.input} ${validationState ? styles[validationState] : ''}`}
                            sx={{
                                ...sx,
                                '& .MuiOutlinedInput-root': {
                                    border: validationState === 'error' ? '1px solid #FF0000' :
                                           validationState === 'success' ? '1px solid #14D81C' :
                                           '1px solid #DEE2E6',
                                },
                                backgroundColor: 'white'
                            }}
                            multiline={multiline}
                            rows={rows}
                            {...props}
                        />
                        </div>
                );
            }
        }

        // Determine the validation hint class based on validation state
        const getValidationHintClass = () => {
          switch (validationState) {
            case 'error':
              return styles.errorHint;
            case 'success':
              return styles.successHint;
            default:
              return '';
          }
        };

        return (
            <div className={`${styles.inputWrapper} ${className || ''}`} style={style}>
              {renderInput()}
              {errorMessage && (
                <FormHelperText error>{errorMessage}</FormHelperText>
              )}
              {validationState && !errorMessage && (
                <div className={`${styles.validationHint} ${getValidationHintClass()}`}>
                  <br />
                  მინიმუმ 2 სიმბოლო
                  <br />
                  მაქსიმუმ 255 სიმბოლო
                </div>
              )}
            </div>
          )
        }
    );

export const ControlledInput = React.memo(<T extends FieldValues>(
  { 
    control,
    name,
    rules,
    errors,
    showErrorMessage = true,
    validationState,
    charCount,
    sx,
    multiline,
    rows,
    ...props
  }: ControlledInputProps<T>
) => {
  const errorMessage = errors?.[name]?.message as string;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <TextInput
          {...props}
          value={value}
          onChange={onChange}
          errorMessage={showErrorMessage ? errorMessage : undefined}
          validationState={validationState}
          charCount={charCount}
          sx={sx}
          multiline={multiline}
          rows={rows}
        />
      )}
    />
  );
});

export default TextInput;