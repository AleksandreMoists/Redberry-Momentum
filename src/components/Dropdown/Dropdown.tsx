import React, { useState, useEffect, useId, useCallback, useMemo, memo } from 'react';
import styles from './Dropdown.style.module.css';
import UpArrowSvg from '../../assets/SVG/UpArrowSvg';
import DownArrowSvg from '../../assets/SVG/DownArrowSvg';
import { useDropdown } from './DropdownContext';
import Typography from '../Typography/Typography';

interface DropdownProps {
    label?: string;
    options: Array<{ id: number; name: string }>;
    onSelect: (selectedItems: number[]) => void;
    id: string;
    type?: 'checkbox' | 'radio';
    externalSelected?: number[];
    variant?: 'default' | 'task' | 'employee';
    placeholder?: string;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    disabled?: boolean;
    defaultSelected?: Array<{ id: number; name: string }>;
    autoClose?: boolean; // Added option to auto-close dropdown after selection
}

const Dropdown: React.FC<DropdownProps> = ({ 
    label, 
    options, 
    onSelect, 
    id, 
    type = 'checkbox',
    externalSelected,
    variant = 'default',
    placeholder = 'აირჩიე',
    containerClassName = '',
    containerStyle = {},
    disabled = false,
    defaultSelected = [],
    autoClose = false // Default to false for backward compatibility
}) => {
    const dropdownId = useId(); 
    const { openDropdownId, setOpenDropdownId } = useDropdown();
    const isOpen = openDropdownId === dropdownId;
    
    // Modified initialization to work with defaultSelected type
    const [selected, setSelected] = useState<number[]>(() => {
        // Try to get from localStorage first
        const saved = localStorage.getItem(`dropdown_${id}`);
        if (saved) {
            return JSON.parse(saved);
        }
        
        if (externalSelected !== undefined) {
            return externalSelected;
        }
        
        return defaultSelected.map(item => item.id);
    });
    
    const [tempSelected, setTempSelected] = useState<number[]>(selected);

    useEffect(() => {
        if (defaultSelected && defaultSelected.length > 0 && !externalSelected) {
            const defaultIds = defaultSelected.map(item => item.id);
            
            const currentIds = JSON.stringify(selected.sort());
            const newIds = JSON.stringify(defaultIds.sort());
            
            if (currentIds !== newIds) {
                setSelected(defaultIds);
                setTempSelected(defaultIds);
                
                onSelect(defaultIds);
            }
        }
    }, [defaultSelected]); 

    // Update internal state when external selected items change
    useEffect(() => {
        if (externalSelected !== undefined) {
            setSelected(externalSelected);
            if (!isOpen) {
                setTempSelected(externalSelected);
            }
        }
    }, [externalSelected, isOpen]);

    useEffect(() => {
        localStorage.setItem(`dropdown_${id}`, JSON.stringify(selected));
    }, [selected, id]);

    const memoizedOptions = useMemo(() => options, [options]);

    useEffect(() => {
        if (isOpen) {
            setTempSelected([...selected]);
        }
    }, [isOpen, selected]);

    const handleToggle = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Don't toggle if disabled
        if (disabled) return;
        
        if (isOpen) {
            setOpenDropdownId(null);
        } else {
            setOpenDropdownId(dropdownId);
        }
    }, [isOpen, setOpenDropdownId, dropdownId, disabled]);

    const handleItemSelect = useCallback((itemId: number) => (e: React.MouseEvent) => {
        // Don't process if disabled
        if (disabled) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        let newSelection: number[];
        
        if (type === 'radio') {
            newSelection = tempSelected.includes(itemId) ? [] : [itemId];
            // For radio type, we always want to close after selection
            const shouldClose = true;
            
            setTempSelected(newSelection);
            setSelected(newSelection);
            onSelect(newSelection);
            
            if (shouldClose) {
                setOpenDropdownId(null);
            }
            return;
        }
        
        // Checkbox type selection logic
        newSelection = tempSelected.includes(itemId)
            ? tempSelected.filter(id => id !== itemId)
            : [...tempSelected, itemId];
            
        setTempSelected(newSelection);
        setSelected(newSelection);
        onSelect(newSelection);
        
        // Auto close for checkbox if that option is enabled
        if (autoClose) {
            setOpenDropdownId(null);
        }
    }, [tempSelected, setTempSelected, setSelected, onSelect, setOpenDropdownId, type, disabled, autoClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
            if (isOpen && !target.closest(`.${styles.dropdown}`)) {
                setOpenDropdownId(null);
                setTempSelected([...selected]);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, setOpenDropdownId, selected]);

    useEffect(() => {
        if (options.length > 0) {
            setSelected(prev => 
                prev.filter(id => options.some(option => option.id === id))
            );
        }
    }, [options]);

    const taskMenuItems = useMemo(() => {
        return memoizedOptions.map(option => (
            <div 
                key={option.id} 
                className={styles.menuItemRow}
                onClick={handleItemSelect(option.id)}
            >
                <input
                    type={type}
                    checked={tempSelected.includes(option.id)}
                    readOnly
                    className={styles.checkbox}
                    disabled={disabled}
                />
                <span className={styles.menuItemText}>{option.name}</span>
            </div>
        ));
    }, [memoizedOptions, tempSelected, handleItemSelect, type, disabled]);

    const checkboxItems = useMemo(() => {
        return memoizedOptions.map(option => (
            <label key={option.id} className={styles.checkboxLabel}>
                <input
                    type={type}
                    checked={tempSelected.includes(option.id)}
                    onClick={handleItemSelect(option.id)}
                    className={styles.checkbox}
                    disabled={disabled}
                />
                {option.name}
            </label>
        ));
    }, [memoizedOptions, tempSelected, handleItemSelect, type, disabled]);

    const selectedNames = useMemo(() => {
        return selected
            .map(id => memoizedOptions.find(o => o.id === id)?.name || '')
            .filter(Boolean);
    }, [selected, memoizedOptions]);

    // Add disabled class names to style elements appropriately
    const disabledClass = disabled ? styles.disabled : '';

    if (variant === 'task' || variant === 'employee') {
        return (
            <div className={`${styles.muiDropdown} ${containerClassName} ${disabledClass}`} style={containerStyle}>
                <label className={styles.muiLabel}>{label}</label>
                <div className={styles.muiSelect}>
                    <button 
                        className={`${styles.muiSelectButton} ${isOpen ? styles.muiSelectButtonActive : ''} ${disabledClass}`}
                        onClick={handleToggle}
                        type="button"
                        style={{ border: "1px solid #DEE2E6" }}
                        disabled={disabled}
                    >
                        <span className={styles.muiSelectText}>
                            {selectedNames.length > 0 
                                ? selectedNames.join(', ')
                                : placeholder}
                        </span>
                        <span className={styles.muiSelectIcon}>
                            {isOpen ? <UpArrowSvg /> : <DownArrowSvg />}
                        </span>
                    </button>
                    
                    {isOpen && !disabled && (
                        <div className={styles.muiMenu}>
                            <div className={`${styles.muiMenuItems} ${
                                variant === 'task' || variant === 'employee' ? 
                                `${styles.scrollableMenu} ${styles.checkboxContainer}` : ''
                            }`}>
                                {taskMenuItems}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    // Modified default variant to not require button press
    return (
        <div className={`${styles.dropdown} ${containerClassName} ${disabledClass}`} style={containerStyle}>
            <button 
                className={`${styles.dropdownToggle} ${isOpen ? styles.dropdownToggleActive : ''} ${disabledClass}`}
                onClick={handleToggle}
                type="button"
                disabled={disabled}
            >
                {label}
                {isOpen ? <UpArrowSvg /> : <DownArrowSvg />}
            </button>
            
            {isOpen && !disabled && (
                <div className={styles.dropdownContent}>
                    <div className={styles.checkboxContainer}>
                        {checkboxItems}
                    </div>
                    {/* Button is now optional based on user preference */}
                </div>
            )}
        </div>
    );
};

export const MemoizedDropdown = memo(Dropdown);

export { MemoizedDropdown as Dropdown };