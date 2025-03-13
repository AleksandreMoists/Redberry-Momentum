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
    `,
    secondary: () => css`
      background-color: var(--bg-secondary);
      color: var(--text-white);
      &:hover {
        background-color: var(--bg-secondary);
        opacity: 0.9;
      }
    `,
    outlined: () => css`
      background-color: transparent;
      border: 1px solid var(--bg-outline);
      color: var(--bg-outline);
      &:hover {
        background-color: rgba(131, 56, 236, 0.04); // #8338EC with 0.04 opacity
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
    ...(variant && buttonStyles.variants[variant]())
}));