import React, { useState } from "react";
import styles from "./MainPage.style.module.css";
import Typography from "../../components/Typography/Typography";
import Layout from "../../components/Layout/Layout";
import DynamicDataCard from "../../components/DynamicDataCard/DynamicDataCard";
import { statusData } from "../../utils/mockData";
import { cardData } from "../../utils/mockData";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import SelectedCategory from "../../components/SelectedCategory/SelectedCategory";
import { useTasksContainer } from './container';
import { DepartmentId, departmentOriginalNameMap } from "../../services/enums/apiEnums";  


const departmentOptions = [
    { id: DepartmentId.HUMAN_RESOURCES, name: departmentOriginalNameMap[DepartmentId.HUMAN_RESOURCES] },
    { id: DepartmentId.TECHNOLOGY, name: departmentOriginalNameMap[DepartmentId.TECHNOLOGY] },
    { id: DepartmentId.FINANCE, name: departmentOriginalNameMap[DepartmentId.FINANCE] },
    { id: DepartmentId.SALES_MARKETING, name: departmentOriginalNameMap[DepartmentId.SALES_MARKETING] },
    { id: DepartmentId.ADMINISTRATION, name: departmentOriginalNameMap[DepartmentId.ADMINISTRATION] },
    { id: DepartmentId.LOGISTICS, name: departmentOriginalNameMap[DepartmentId.LOGISTICS] },
    { id: DepartmentId.MEDIA, name: departmentOriginalNameMap[DepartmentId.MEDIA] },
];

const priorityOptions = [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" }
];

const employeeOptions = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" }
];

const MainPage: React.FC = () => {
    const [departments, setDepartments] = useState<number[]>([]);
    const [priorities, setPriorities] = useState<number[]>([]);
    const [employees, setEmployees] = useState<number[]>([]);

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
    };

    const { 
        filteredTasks, 
        loading, 
        error,
        filterByStatus,
        filterByPriority,
        filterByDepartment 
    } = useTasksContainer();

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error loading tasks: {error.message}</div>;

    return (
        <Layout>
            <div className={styles.category}>
                <Typography variant="h1">დავალებების გვერდი</Typography>
                <div className={styles.categoryDropdown}>
                <Dropdown 
                    id="departments"
                    label="დეპარტამენტი"
                    options={departmentOptions}
                    onSelect={setDepartments}
                    externalSelected={departments}
                />

                <Dropdown 
                    id="priorities"
                    label="პრიორიტეტი"
                    options={priorityOptions}
                    onSelect={setPriorities}
                    externalSelected={priorities}
                />

                <Dropdown 
                    id="employees"
                    label="თანამშრომელი"
                    options={employeeOptions}
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
                        employeeOptions={employeeOptions}
                        onRemove={handleRemoveItem}
                        onClearAll={handleClearAll}
                    />
                </div>
            </div>

            <div className={styles.main}>
                 <div className={styles.userStatus}>
                    {statusData.map((item) => (
                        <span
                            key={item.id}
                            className={styles.userStatusStyle}
                            style={{ backgroundColor: item.color }}
                        >
                            <Typography variant="h2" className={styles.userStatusLabel}>{item.label}</Typography>
                        </span>
                    ))}
                 </div>

                 <div className={styles.dynamicDataCards}>
                    {filteredTasks.map((card, index) => (
                        <DynamicDataCard 
                            key={index}
                            {...card}
                        />
                    ))}
                 </div>
            </div>
        </Layout>
    );
};

export default MainPage;