import React from "react"

interface RecycleSvgProps {
    width?: number;
    height?: number;
}

const RecycleSvg: React.FC<RecycleSvgProps> = ({ width = 14, height = 14 }) => (
    <svg
        width={width}
        height={height} 
        viewBox="0 0 14 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
    <path d="M1.75 3.5H2.91667H12.25" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.0837 3.49984V11.6665C11.0837 11.9759 10.9607 12.2727 10.7419 12.4915C10.5232 12.7103 10.2264 12.8332 9.91699 12.8332H4.08366C3.77424 12.8332 3.47749 12.7103 3.2587 12.4915C3.03991 12.2727 2.91699 11.9759 2.91699 11.6665V3.49984M4.66699 3.49984V2.33317C4.66699 2.02375 4.78991 1.72701 5.0087 1.50821C5.22749 1.28942 5.52424 1.1665 5.83366 1.1665H8.16699C8.47641 1.1665 8.77316 1.28942 8.99195 1.50821C9.21074 1.72701 9.33366 2.02375 9.33366 2.33317V3.49984" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.83301 6.4165V9.9165" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.16699 6.4165V9.9165" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
)

export default RecycleSvg;