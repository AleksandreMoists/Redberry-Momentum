import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import MomentumSvg from '../../assets/SVG/MomentumSvg';
import PlusSvg from '../../assets/SVG/PlusSvg';
import styles from './Layout.style.module.css';

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div 
          className={styles.logo} 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="h1" className={styles.logoStyle}>
            Momentum
          </Typography>
          <MomentumSvg />
        </div>

        <div className={styles.buttons}>
          <Button 
            type="button" 
            variant="outlined" 
            onClick={() => navigate('/create-employee')}
          >
            თანამშრომლის შექმნა
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate('/create-task')}
            startIcon={<PlusSvg />}
          >
            შექმენი ახალი დავალება
          </Button>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default Layout;