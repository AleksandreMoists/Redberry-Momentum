import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DynamicDataCard.style.module.css';
import Typography from '../Typography/Typography';
import CommentsSvg from '../../assets/SVG/CommentsSvg';
import Priority from '../Priority/Priority';
import Department from '../Department/Department';
import { departmentOptions } from '../../pages/MainPage/container';

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
    total_comments: number;
}

const DynamicDataCard: React.FC<DynamicDataCardProps> = ({
    id,
    name,
    description,
    due_date,
    priority,
    department,
    employee,
    total_comments
}) => {
    const navigate = useNavigate();

    const departmentData = departmentOptions.find(dept => dept.id === department.id) || department;

    const handleCardClick = () => {
        navigate(`/task/${id}`);
    };

    const formattedDate = due_date;

    const hasAvatar = employee.avatar && employee.avatar.trim() !== '';

    return (
        <div 
            className={styles.container}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            aria-label={`View details for task: ${name}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick();
                }
            }}
        >  
            <div className={styles.priority}>
                <div className={styles.priorityStyle}>
                    <Priority 
                        id={priority.id}
                        name={priority.name}
                        icon={priority.icon}
                    />
                    <Department
                        id={department.id}
                        name={departmentData.name}
                    />
                </div>
                <div>
                    <span className={styles.date}>{formattedDate}</span>
                </div>
            </div>

            <div className={styles.details}>
                <div>
                    <Typography variant="subtitle">{name}</Typography>
                </div>
                <div>
                    <Typography variant="caption">
                        {description.length > 120 ? `${description.substring(0, 120)}...` : description}
                    </Typography>
                </div>
            </div>

            <div className={styles.user}>
                <div>
                    {hasAvatar ? (
                        <img 
                            src={employee.avatar} 
                            alt={`${employee.name} ${employee.surname}`} 
                            className={styles.imageStyle}
                        />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            {`${employee.name.charAt(0)}${employee.surname.charAt(0)}`}
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '4px'}}>
                    <CommentsSvg />
                    <Typography variant='subtitle'>{total_comments}</Typography>
                </div>
            </div>
        </div>
    );
};

export default DynamicDataCard;