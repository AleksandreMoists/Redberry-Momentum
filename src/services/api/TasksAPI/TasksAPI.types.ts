interface TaskStatus {
    id: number;
    name: string;
  }
  
interface TaskPriority {
    id: number;
    name: string;
    icon: string;
}

interface Department {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department_id: number;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: TaskStatus;
    priority: TaskPriority;
    department: Department;
    employee: Employee;
    total_comments: number;
}