import { CSSProperties } from "react";
import { FieldErrors, FieldValues, UseControllerProps } from "react-hook-form";

export type TextInputProps = {
  label?: string;
  errorMessage?: string;
  type?: "text" | "checkbox" | "radio";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onChange?: (value: string) => void;
  value?: string;
  validationState?: string;
  charCount?: number;
  sx?: any; // For MUI styling object
  multiline?: boolean; // Add multiline prop
  rows?: number; // Add rows prop
};

export type ControlledInputProps<T extends FieldValues> = TextInputProps &
  UseControllerProps<T> & {
    errors?: FieldErrors<T>;
    showErrorMessage?: boolean;
  };