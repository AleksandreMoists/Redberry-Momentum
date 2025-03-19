export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar?: string;
    department_id: number;
}

export interface EmployeePost {
    name: string;
    surname: string;
    avatar?: File;
    department_id: number;
}