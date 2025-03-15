import React from 'react';
import styles from './Priority.style.module.css';
import Typography from '../Typography/Typography';

interface PriorityProps {
  id: number;
  name: string;
  icon: string;
}

export const Priority: React.FC<PriorityProps> = ({ id, name, icon }) => {
  const priorityClass = `${styles.priority} ${styles[`priority${id}`]}`;
  
  return (
    <div className={priorityClass}>
      <img src={icon} alt={name} className={styles.icon} />
      <Typography variant="h3">{name}</Typography>
    </div>
  );
};

export default Priority;