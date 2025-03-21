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
    <path d="M5 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 15V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default React.memo(PlusSvg);
