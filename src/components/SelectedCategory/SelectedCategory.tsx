import React from "react";
import styles from "./SelectedCategory.style.module.css";
import Typography from "../Typography/Typography";
import { XSvg } from "../../assets/SVG/XSvg";

interface Option {
  id: number;
  name: string;
}

type CategoryType = 'department' | 'priority' | 'employee';

interface SelectedCategoryProps {
    selectedDepartments: number[];
    selectedPriorities: number[];
    selectedEmployees: number[];
    departmentOptions: Option[];
    priorityOptions: Option[];
    employeeOptions: Option[];
    onRemove?: (type: CategoryType, id: number) => void;
    onClearAll?: () => void;
}

const SelectedCategory: React.FC<SelectedCategoryProps> = ({ 
    selectedDepartments, 
    selectedPriorities, 
    selectedEmployees,
    departmentOptions,
    priorityOptions,
    employeeOptions,
    onRemove,
    onClearAll
}) => {
    const departments = selectedDepartments.map(id => {
        const option = departmentOptions.find(opt => opt.id === id);
        return { type: 'department' as CategoryType, id, name: option?.name || 'Unknown' };
    });
    
    const priorities = selectedPriorities.map(id => {
        const option = priorityOptions.find(opt => opt.id === id);
        return { type: 'priority' as CategoryType, id, name: option?.name || 'Unknown' };
    });
    
    const employees = selectedEmployees.map(id => {
        const option = employeeOptions.find(opt => opt.id === id);
        return { type: 'employee' as CategoryType, id, name: option?.name || 'Unknown' };
    });
    
    const allSelected = [...departments, ...priorities, ...employees];
    
    return (
        <div className={styles.selectedCategory}>
            {allSelected.map((item) => (
                <div key={`${item.type}-${item.id}`} className={styles.selectedCategoryItem}>
                    <Typography variant="caption">{item.name}</Typography>
                    {onRemove && (
                        <button 
                            className={styles.removeButton}
                            onClick={() => onRemove(item.type, item.id)}
                        >
                            <XSvg />
                        </button>
                    )}
                </div>
            ))}
            
            {allSelected.length > 0 && onClearAll && (
                <div 
                    className={styles.clearAll}
                    onClick={onClearAll}
                >
                    <Typography variant="caption" className={styles.clearAllStyle}>გასუფთავება</Typography>
                </div>
            )}
        </div>
    );
};

export default SelectedCategory;