import { georgianMonthAbbreviations } from "../services/enums/apiEnums";

export const formatDateGeorgian = (dateString: string): string => {
    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return "Invalid date"
        }

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const monthAbbr = georgianMonthAbbreviations[month];
    
        return `${day} ${monthAbbr}, ${year}`;
    
    } catch(error) {
        console.error("Error formating date:", error);
        return "Error";
    }
}