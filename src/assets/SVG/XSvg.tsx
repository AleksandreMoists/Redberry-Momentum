import React from "react";

interface XSvgProps {
    width?: number;
    height?: number;
}

export const XSvg: React.FC<XSvgProps> = ({ width = 14, height = 14 }) => {
    return (
        <svg 
            width={width} 
            height={height}
            viewBox="0 0 14 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 4L3.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.5 4L10.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}
