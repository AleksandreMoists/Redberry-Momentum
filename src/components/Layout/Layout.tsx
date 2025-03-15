import React from 'react';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import MomentumSvg from '../../assets/SVG/MomentumSvg';
import PlusSvg from '../../assets/SVG/PlusSvg';
import styles from './Layout.style.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo} onClick={() => {}} style={{ cursor: 'pointer' }}>
          <Typography variant="h1" className={styles.logoStyle}>
            Momentum
          </Typography>
          <MomentumSvg />
        </div>

        <div className={styles.buttons}>
          <Button type="button" variant="outlined" onClick={() => {}}>
            თანამშრომლის შექმნა
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {}}
            startIcon={<PlusSvg />}
          >
            შექმენი ახალი დავალება
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;