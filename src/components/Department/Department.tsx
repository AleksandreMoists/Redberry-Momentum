import React from "react";
import styles from "./Department.style.module.css";
import Typography from "../Typography/Typography";

interface DepartmentProps {
    id: number; 
    name: string;
}

const Department: React.FC<DepartmentProps> = ({ id, name }) => {
    return (
        <div className={styles.department} data-id={id}>
            <Typography variant="caption" className={styles.departmentName}>{name}</Typography>
        </div>
    );
};

export default Department;