import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';
import { css } from '@mui/system';
import '../../assets/styles/colors.style.module.css';

export const buttonStyles = {
  base: css`
    text-transform: none;
    border-radius: 8px;
    font-family: 'FiraGO', sans-serif;
    transition: all 0.2s ease-in-out;
    height: 40px; // Added fixed height
    min-width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500; // Medium font weight for better readability
    white-space: nowrap; // Prevents text wrapping within button
    overflow: hidden; // Prevents text overflow
    text-overflow: ellipsis; // Adds ellipsis for text that overflows
  `,

  sizes: {
    small: css`
      padding: 8px 16px;
      font-size: 14px;
      line-height: 20px;
    `,
    medium: css`
      padding: 10px 20px;
      font-size: 16px;
      line-height: 24px;
    `,
    large: css`
      padding: 12px 24px;
      font-size: 18px;
      line-height: 28px;
    `
  },

  variants: {
    primary: () => css`
      background-color: var(--bg-primary);
      color: var(--text-white);
      &:hover {
        background-color: var(--bg-primary);
        opacity: 0.9;
      }
      &:disabled {
        background-color: var(--bg-primary);
        opacity: 0.5;
        color: var(--text-white);
      }
    `,
    secondary: () => css`
      background-color: var(--bg-secondary);
      color: var(--text-white);
      &:hover {
        background-color: var(--bg-secondary);
        opacity: 0.9;
      }
      &:disabled {
        background-color: var(--bg-secondary);
        opacity: 0.5;
        color: var(--text-white);
      }
    `,
    outlined: () => css`
      background-color: transparent;
      border: 1px solid var(--bg-outline);
      color: var(--bg-outline);
      &:hover {
        background-color: rgba(131, 56, 236, 0.04); // #8338EC with 0.04 opacity
      }
      &:disabled {
        border-color: var(--bg-outline);
        opacity: 0.5;
        color: var(--bg-outline);
      }
    `,
    text: () => css`
      background-color: transparent;
      color: var(--bg-primary);
      padding: 8px 12px;
      &:hover {
        background-color: rgba(131, 56, 236, 0.04);
      }
      &:disabled {
        color: var(--bg-primary);
        opacity: 0.5;
      }
    `
  }
};

type ButtonSize = keyof typeof buttonStyles.sizes;
type ButtonVariant = keyof typeof buttonStyles.variants;

export const StyledButton = styled(MuiButton)<{ size?: ButtonSize; variant?: ButtonVariant }>(
  ({ theme, size, variant }) => ({
    ...buttonStyles.base,
    ...(size && buttonStyles.sizes[size]),
    ...(variant && buttonStyles.variants[variant]()),
    '& .MuiButton-startIcon': {
      marginRight: '8px'
    },
    '& .MuiButton-endIcon': {
      marginLeft: '8px'
    },
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
}));