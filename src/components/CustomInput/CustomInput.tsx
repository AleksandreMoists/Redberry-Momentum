import React from "react";
import { Input, InputLabel, FormHelperText, FormControlLabel, Checkbox, Radio } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ControlledInputProps, TextInputProps } from "./CustomInput.types";
import styles from "./CustomInput.style.module.css";

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
                    <>
                        {label && <InputLabel>{label}</InputLabel>}
                        <Input
                            type={type}
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                            disabled={disabled}
                            fullWidth={fullWidth}
                            error={!!errorMessage}
                            sx={sx}
                            multiline={multiline}
                            rows={rows}
                            {...props}
                        />
                    </>
                );
            }
        }

        return (
            <div className={`${styles.inputWrapper} ${className || ''}`} style={style}>
              {renderInput()}
              {errorMessage && (
                <FormHelperText error>{errorMessage}</FormHelperText>
              )}
              {charCount && (
                <div className={styles.charCount}>{charCount}</div>
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
        />
      )}
    />
  );
});

export default TextInput;