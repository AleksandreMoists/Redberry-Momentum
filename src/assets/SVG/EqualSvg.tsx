import React from "react"

interface EqualSvgProps {
    width?: number;
    height?: number;
}

const EqualSvg: React.FC<EqualSvgProps> = ({ width=12, height=10 }) => (
    <svg 
        width={width} 
        height={height} 
        viewBox="0 0 12 10" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        >
    <path d="M1 0.5H11C11.6 0.5 12 0.95 12 1.625C12 2.3 11.6 2.75 11 2.75H1C0.4 2.75 0 2.3 0 1.625C0 0.95 0.4 0.5 1 0.5ZM1 7.25H11C11.6 7.25 12 7.7 12 8.375C12 9.05 11.6 9.5 11 9.5H1C0.4 9.5 0 9.05 0 8.375C0 7.7 0.4 7.25 1 7.25Z" fill="#FFBE0B"/>
    </svg>
)

export default React.memo(EqualSvg);
