import React from "react"

interface UpArrowProps {
    width?: number;
    height?: number;
    fill?: string;
}

const UpArrowSvg: React.FC<UpArrowProps> = ({ width=14, height=15, fill="none"}) => (
    <svg 
        width={width} 
        height={height} 
        viewBox="0 0 14 15" 
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        >
    <path d="M2.38012 9.27917L6.18345 5.47584C6.63262 5.02667 7.36762 5.02667 7.81678 5.47584L11.6201 9.27917" stroke="#8338EC" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default React.memo(UpArrowSvg);