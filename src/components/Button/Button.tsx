import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled(MuiButton)(() => ({
  textTransform: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  
  '&.primary': {
    backgroundColor: '#8338EC',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#6c2ec4',
    },
  },
  
  '&.secondary': {
    backgroundColor: '#3A86FF',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2e6ccc',
    },
  },
  
  '&.outlined': {
    border: '1px solid #8338EC',
    color: '#8338EC',
    '&:hover': {
      backgroundColor: 'rgba(131, 56, 236, 0.04)',
    },
  },

  '&.small': {
    padding: '6px 16px',
    fontSize: '0.875rem',
  },
  
  '&.medium': {
    padding: '8px 20px',
    fontSize: '0.938rem',
  },
  
  '&.large': {
    padding: '10px 24px',
    fontSize: '1rem',
  },
}));

export const Button = ({ 
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      className={`${variant} ${size} ${className || ''}`}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;