interface DepartmentProps {
    id: number;  // Changed from string to number
    name: string;
}

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar?: string;
    department: DepartmentProps;
}

export interface EmployeePost {
    name: string;
    surname: string;
    avatar?: File;
    department_id: number;
}