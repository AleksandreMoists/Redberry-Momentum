import React, { useState, useEffect } from "react";
import styles from "./MainPage.style.module.css";
import Typography from "../../components/Typography/Typography";
import Layout from "../../components/Layout/Layout";
import DynamicDataCard from "../../components/DynamicDataCard/DynamicDataCard";
import { statusData } from "../../utils/mockData";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import SelectedCategory from "../../components/SelectedCategory/SelectedCategory";
import { useTasksContainer, departmentOptions } from './container';
import { priorities } from "../../utils/mockData";

const MainPage: React.FC = () => {
    const [departments, setDepartments] = useState<number[]>([]);
    const [priorities, setPriorities] = useState<number[]>([]);
    const [employees, setEmployees] = useState<number[]>([]);

    const { 
        filteredTasks, 
        loading, 
        error,
        filterByEmployee,
        filterByPriority,
        filterByDepartment,
        resetFilters,
        employeeOptions
    } = useTasksContainer();

    // Apply filters whenever selections change
    useEffect(() => {
        // Apply department filter
        const departmentId = departments.length > 0 ? departments[0] : null;
        filterByDepartment(departmentId);
        
        // Apply priority filter
        const priorityId = priorities.length > 0 ? priorities[0] : null;
        filterByPriority(priorityId);
        
        // Apply employee filter
        const employeeId = employees.length > 0 ? employees[0] : null;
        filterByEmployee(employeeId);
    }, [departments, priorities, employees, filterByDepartment, filterByPriority, filterByEmployee]);

    const handleRemoveItem = (type: string, id: number) => {
        if (type === 'department') {
            setDepartments(prev => prev.filter(deptId => deptId !== id));
        } else if (type === 'priority') {
            setPriorities(prev => prev.filter(priorityId => priorityId !== id));
        } else if (type === 'employee') {
            setEmployees(prev => prev.filter(empId => empId !== id));
        }
    };

    const handleClearAll = () => {
        setDepartments([]);
        setPriorities([]);
        setEmployees([]);
        resetFilters(); // Clear all filters in the container
    };

    // Create a properly formatted employee options array
    const formattedEmployeeOptions = employeeOptions.map(emp => ({
        id: emp.id,
        name: `${emp.name} ${emp.surname}`
    }));

    // Define priority options
    const priorityOptions = [
        { id: 3, name: "მაღალი" },
        { id: 2, name: "საშუალო" },
        { id: 1, name: "დაბალი" }
    ];

    // Group tasks by status id
    const getTasksByStatus = (statusId: number) => {
        return filteredTasks.filter(task => task.status.id === statusId);
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error loading tasks: {error.message}</div>;

    return (
        <>
            <div className={styles.category}>
                <Typography variant="h1">Tasks Page</Typography>
                <div className={styles.categoryDropdown}>
                <Dropdown 
                    id="departments"
                    label="Department"
                    options={departmentOptions}
                    onSelect={setDepartments}
                    externalSelected={departments}
                    type="radio" // Changed to radio to enforce single selection
                />

                <Dropdown 
                    id="priorities"
                    label="Priority"
                    options={priorityOptions}
                    onSelect={setPriorities}
                    externalSelected={priorities}
                    type="radio" // Changed to radio to enforce single selection
                />

                <Dropdown 
                    id="employees"
                    label="Employee"
                    options={formattedEmployeeOptions}
                    onSelect={setEmployees}
                    type="radio"
                    externalSelected={employees}
                />
                </div>
                <div className={styles.selectedCategory}>
                    <SelectedCategory 
                        selectedDepartments={departments}
                        selectedPriorities={priorities}    
                        selectedEmployees={employees}
                        departmentOptions={departmentOptions}
                        priorityOptions={priorityOptions}
                        employeeOptions={formattedEmployeeOptions}
                        onRemove={handleRemoveItem}
                        onClearAll={handleClearAll}
                    />
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.kanbanBoard}>
                    {statusData.map((status) => (
                        <div key={status.id} className={styles.statusColumn}>
                            <div 
                                className={styles.columnHeader} 
                                style={{ backgroundColor: status.color }}
                            >
                                <Typography variant="h2" className={styles.columnLabel}>
                                    {status.label}
                                </Typography>
                            </div>
                            
                            <div className={styles.columnContent}>
                                {getTasksByStatus(status.id).length > 0 ? (
                                    getTasksByStatus(status.id).map((task, index) => (
                                        <DynamicDataCard 
                                            key={task.id || index}
                                            {...task}
                                        />
                                    ))
                                ) : (
                                    <div className={styles.emptyColumn}>
                                        <Typography variant="caption">
                                            No tasks in this status
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredTasks.length === 0 && (
                    <div className={styles.noResults}>
                        <Typography variant="h2">No tasks found with the selected filters</Typography>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainPage;