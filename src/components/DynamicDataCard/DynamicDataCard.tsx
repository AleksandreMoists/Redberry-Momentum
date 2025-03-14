import React from 'react';
import styles from './DynamicDataCard.style.module.css';
import Typography from '../Typography/Typography';
import CommentsSvg from '../../assets/SVG/CommentsSvg';
import Priority from '../Priority/Priority';
import Department from '../Department/Department';

interface DynamicDataCardProps {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: {
        id: number;
        name: string;
    };
    priority: {
        id: number;
        name: string;
        icon: string;
    };
    department: {
        id: number;
        name: string;
    };
    employee: {
        id: number;
        name: string;
        surname: string;
        avatar: string;
        department_id: number;
    };
}

const DynamicDataCard: React.FC<DynamicDataCardProps> = ({
    name,
    description,
    due_date,
    priority,
    department,
    employee
}) => {
    return (
        <div className={styles.container}>  
            <div className={styles.priority}>
                <div className={styles.priorityStyle}>
                    <Priority 
                        id={priority.id}
                        name={priority.name}
                        icon={priority.icon}
                    />
                    <Department
                        id={department.id}
                        name={department.name}
                    />
                </div>
                <div>
                    <span className={styles.date}>{due_date}</span>
                </div>
            </div>

            <div className={styles.details}>
                <div>
                    <Typography variant="subtitle">{name}</Typography>
                </div>
                <div>
                    <Typography variant="caption">{description}</Typography>
                </div>
            </div>

            <div className={styles.user}>
                <div>
                    <img src={employee.avatar} alt={`${employee.name} ${employee.surname}`} />
                </div>
                <div>
                    <CommentsSvg />
                </div>
            </div>
        </div>
    );
};

export default DynamicDataCard;