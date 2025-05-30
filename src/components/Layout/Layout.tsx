import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import MomentumSvg from '../../assets/SVG/MomentumSvg';
import PlusSvg from '../../assets/SVG/PlusSvg';
import styles from './Layout.style.module.css';
import CreateEmployeeModal from '../../pages/CreateEmployee/CreateEmployee';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEmployeeSubmit = () => {
    // Handle successful employee creation
    setIsModalOpen(false);
    // You could optionally add a success message or refresh data here
  };  

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
            onClick={handleOpenModal}
          >
            Create Employee
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate('/create-task')}
            startIcon={<PlusSvg />}
          >
            Create New Task
          </Button>
        </div>
      </div>
      
      {isModalOpen && (
        <CreateEmployeeModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          onSubmit={handleEmployeeSubmit}
        />
      )}
      
      <Outlet />
    </div>
  );
};

export default Layout;