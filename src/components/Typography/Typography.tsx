import React from 'react';
import styles from './Typography.style.module.css'

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3'| 'subtitle' | 'caption';
    children: React.ReactNode;
    className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, className='' }) => {
    const getVariantClass = () => {
        switch(variant) {
            case 'h1':
                return styles.h1;
            case 'h2':
                return styles.h2;
            case 'h3':
                return styles.h3;
            case 'subtitle':
                return styles.subtitle;
            case 'caption':
                return styles.caption;
            default:
                return '';
        }
    };

    const combinedClassName = `${getVariantClass()} ${className}`;

    switch(variant) {
        case 'h1':
            return <h1 className={combinedClassName}>{children}</h1>;
        case 'h2':
            return <h2 className={combinedClassName}>{children}</h2>;
        case 'h3':
            return <h3 className={combinedClassName}>{children}</h3>;
        case 'subtitle':
            return <h4 className={combinedClassName}>{children}</h4>;
        case 'caption':
            return <p className={combinedClassName}>{children}</p>;
        default:
            return <p className={combinedClassName}>{children}</p>;
    }
};

export default Typography