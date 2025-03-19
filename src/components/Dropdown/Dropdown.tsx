import React, { useState, useEffect, useId, useCallback, useMemo, memo } from 'react';
import styles from './Dropdown.style.module.css';
import UpArrowSvg from '../../assets/SVG/UpArrowSvg';
import DownArrowSvg from '../../assets/SVG/DownArrowSvg';
import { useDropdown } from './DropdownContext';
import Typography from '../Typography/Typography';

interface DropdownProps {
    label: string;
    options: Array<{ id: number; name: string }>;
    onSelect: (selectedItems: number[]) => void;
    id: string;
    type?: 'checkbox' | 'radio';
    externalSelected?: number[];
    variant?: 'default' | 'task' | 'employee';  // Added employee variant
    placeholder?: string;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
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
    containerStyle = {}
}) => {
    const dropdownId = useId(); 
    const { openDropdownId, setOpenDropdownId } = useDropdown();
    const isOpen = openDropdownId === dropdownId;
    
    const [selected, setSelected] = useState<number[]>(() => {
        const saved = localStorage.getItem(`dropdown_${id}`);
        return saved ? JSON.parse(saved) : [];
    });
    
    const [tempSelected, setTempSelected] = useState<number[]>([]);

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
        e.preventDefault(); // Prevent form submission
        e.stopPropagation(); // Stop event bubbling
        
        if (isOpen) {
            setOpenDropdownId(null);
        } else {
            setOpenDropdownId(dropdownId);
        }
    }, [isOpen, setOpenDropdownId, dropdownId]);

    // Simplified handlers that directly update both temp and final state
    const handleItemSelect = useCallback((itemId: number) => (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        e.stopPropagation(); // Stop event bubbling
        
        // For radio buttons (single select)
        if (type === 'radio') {
            // Toggle selection: if already selected, clear it; otherwise select it
            const newSelection = tempSelected.includes(itemId) ? [] : [itemId];
            setTempSelected(newSelection);
            setSelected(newSelection);
            onSelect(newSelection);
            // Close dropdown after selection for radio type
            setOpenDropdownId(null);
            return;
        }
        
        // For checkboxes (multi-select)
        const newSelection = tempSelected.includes(itemId)
            ? tempSelected.filter(id => id !== itemId)
            : [...tempSelected, itemId];
        setTempSelected(newSelection);
        setSelected(newSelection);
        onSelect(newSelection);
    }, [tempSelected, setTempSelected, setSelected, onSelect, setOpenDropdownId, type]);

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

    // When API data loads
    useEffect(() => {
        if (options.length > 0) {
            setSelected(prev => 
                prev.filter(id => options.some(option => option.id === id))
            );
        }
    }, [options]);

    // Create clickable menu items where the entire row is clickable
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
                />
                <span className={styles.menuItemText}>{option.name}</span>
            </div>
        ));
    }, [memoizedOptions, tempSelected, handleItemSelect, type]);

    // Regular checkbox items (for default variant)
    const checkboxItems = useMemo(() => {
        return memoizedOptions.map(option => (
            <label key={option.id} className={styles.checkboxLabel}>
                <input
                    type={type}
                    checked={tempSelected.includes(option.id)}
                    onClick={handleItemSelect(option.id)}
                    className={styles.checkbox}
                />
                {option.name}
            </label>
        ));
    }, [memoizedOptions, tempSelected, handleItemSelect, type]);

    // Get selected option names for display
    const selectedNames = useMemo(() => {
        return selected
            .map(id => memoizedOptions.find(o => o.id === id)?.name || '')
            .filter(Boolean);
    }, [selected, memoizedOptions]);

    // MUI-style dropdown (task and employee variants)
    if (variant === 'task' || variant === 'employee') {
        return (
            <div className={`${styles.muiDropdown} ${containerClassName}`} style={containerStyle}>
                <label className={styles.muiLabel}>{label}</label>
                <div className={styles.muiSelect}>
                    <button 
                        className={`${styles.muiSelectButton} ${isOpen ? styles.muiSelectButtonActive : ''}`}
                        onClick={handleToggle}
                        type="button"
                        style={{ border: "1px solid #DEE2E6" }}
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
                    
                    {isOpen && (
                        <div className={styles.muiMenu}>
                            {/* Use checkboxContainer class for consistent scrollbar styling */}
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
    
    // Default variant
    return (
        <div className={`${styles.dropdown} ${containerClassName}`} style={containerStyle}>
            <button 
                className={`${styles.dropdownToggle} ${isOpen ? styles.dropdownToggleActive : ''}`}
                onClick={handleToggle}
                type="button"
            >
                {label}
                {isOpen ? <UpArrowSvg /> : <DownArrowSvg />}
            </button>
            
            {isOpen && (
                <div className={styles.dropdownContent}>
                    <div className={styles.checkboxContainer}>
                        {checkboxItems}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            onClick={handleToggle}
                            className={styles.saveButton}
                            type="button"
                            style={{ border: "1px solid #DEE2E6" }} // Added border styling here
                        >
                            <Typography variant='h3'>არჩევა</Typography>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const MemoizedDropdown = memo(Dropdown);

export { MemoizedDropdown as Dropdown };
