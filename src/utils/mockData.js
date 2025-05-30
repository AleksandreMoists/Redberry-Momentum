export const priorities = [
    {id: 3, name: "High", icon: "https://momentum.redberryinternship.ge/storage/priority-icons/High.svg"},
    {id: 2, name: "Medium", icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg"},
    {id: 1, name: "Low", icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg"}
]

export const statusData = [
    {id: 1, label: "To Do", color: "#27AE60"},
    {id: 2, label: "In Progress", color: "#E67E22"},
    {id: 3, label: "Ready for Testing", color: "#FF006E"},
    {id: 4, label: "Completed", color: "#3A86FF"},
];

export const cardData = [
    {
        id: 1,
        name: "Redberry-ს საიტის ლენდინგის დიზაინი",
        description: "შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას.",
        due_date: "22 იანვ, 2022",
        status: {id: 1, name: "Todo"},
        priority: {id: 2, name: "საშუალო", icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg"},
        department: {
            id: 6,
            name: "IT"
        },
        employee: {
            id: 1,
            name: "ლადო",
            surname: "გაგა",
            avatar: "…",
            department_id: 1
        }
    },
    {
        id: 2,
        name: "Redberry-ს საიტის ლენდინგის დიზაინი",
        description: "შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას.",
        due_date: "22 იანვ, 2022",
        status: {id: 1, name: "Todo"},
        priority: {id: 1, name: "High", icon: ""},
        department: {
            id: 1,
            name: "IT"
        },
        employee: {
            id: 1,
            name: "ლადო",
            surname: "გაგა",
            avatar: "…",
            department_id: 1
        }
    }
];

