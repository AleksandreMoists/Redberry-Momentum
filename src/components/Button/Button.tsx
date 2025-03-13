import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  
  '&.primary': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  
  '&.secondary': {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  
  '&.outlined': {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
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