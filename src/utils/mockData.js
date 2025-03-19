export const priorities = [
    {
        id: 1,
        name: "დაბალი",
        icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg"
    },
    {
        id: 2,
        name: "საშუალო",
        icon: "https://www.pacific-research.com/wp-content/uploads/2020/05/medium-icon.png"
    },
    {
        id: 3,
        name: "მაღალი",
        icon: "https://momentum.redberryinternship.ge/storage/priority-icons/High.svg"
    }
]

export const statusData = [
    {id: 0, label: "დასაწყები", color: "#F7BC30"},
    {id: 1, label: "პროგრესში", color: "#FB5607"},
    {id: 2, label: "მზად ტესტირებისთვის", color: "#FF006E"},
    {id: 3, label: "დასრულებული", color: "#3A86FF"},
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

