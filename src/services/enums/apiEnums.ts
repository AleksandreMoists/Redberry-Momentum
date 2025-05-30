export enum DepartmentId {
    ADMINISTRATION = 1,
    HUMAN_RESOURCES = 2, 
    FINANCE = 3,
    SALES_MARKETING = 4,
    LOGISTICS = 5,
    TECHNOLOGY = 6,
    MEDIA = 7
  }
  
  export const departmentNameMap: { [key: number]: string } = {
    [DepartmentId.ADMINISTRATION]: "Administration",
    [DepartmentId.HUMAN_RESOURCES]: "HR",
    [DepartmentId.FINANCE]: "Finance",
    [DepartmentId.SALES_MARKETING]: "Sales & Marketing",
    [DepartmentId.LOGISTICS]: "Logistics",
    [DepartmentId.TECHNOLOGY]: "Tech",
    [DepartmentId.MEDIA]: "Media"
  };
  
  export const departmentOriginalNameMap: { [key: number]: string } = {
    [DepartmentId.ADMINISTRATION]: "Administration",
    [DepartmentId.HUMAN_RESOURCES]: "HR",
    [DepartmentId.FINANCE]: "Finance",
    [DepartmentId.SALES_MARKETING]: "Marketing",
    [DepartmentId.LOGISTICS]: "Logistics",
    [DepartmentId.TECHNOLOGY]: "IT",
    [DepartmentId.MEDIA]: "Design"
  };

  export const georgianMonthAbbreviations = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

