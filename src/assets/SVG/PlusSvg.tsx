import React from "react"

interface PlusSvgProps {
    width?: number;
    height?: number;
}

const PlusSvg: React.FC<PlusSvgProps> = ({ width=20, height=20}) => (
    <svg 
        width={width} 
        height={height} 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M5 10H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 15V5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export default React.memo(PlusSvg);
