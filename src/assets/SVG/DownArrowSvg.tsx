import React from "react"

interface DownArrowProps {
    width: number;
    height: number;
    fill: string;
}

const DownArrowSvg: React.FC<DownArrowProps> = ({ width=14, height=15, fill="none"}) => (
    <svg 
        width={width}
        height={height}
        viewBox="0 0 14 15" 
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        >
    <path d="M11.6199 5.72083L7.81655 9.52416C7.36738 9.97333 6.63238 9.97333 6.18322 9.52416L2.37988 5.72083" stroke="#343A40" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export default React.memo(DownArrowSvg);