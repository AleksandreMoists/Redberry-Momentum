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
}

const Dropdown: React.FC<DropdownProps> = ({ 
    label, 
    options, 
    onSelect, 
    id, 
    type='checkbox',
    externalSelected 
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

    const handleToggle = useCallback(() => {
        if (isOpen) {
            setOpenDropdownId(null);
        } else {
            setOpenDropdownId(dropdownId);
        }
    }, [isOpen, setOpenDropdownId, dropdownId]);

    const handleCheckboxChange = useCallback((id: number) => {
        setTempSelected(prev => 
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }, []);


    // Radio change for employee dropdown
    const handleRadioChange = useCallback((id: number) => {
        setTempSelected(prev => {
            if(prev.length === 1 && prev[0] === id) {
                return [];
            }
            return [id];
        });
    }, []);

    const handleSave = useCallback(() => {
        setSelected(tempSelected);
        onSelect(tempSelected);
        setOpenDropdownId(null);
    }, [tempSelected, onSelect, setOpenDropdownId]);

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

    const checkboxItems = useMemo(() => {
        return memoizedOptions.map(option => (
            <label key={option.id} className={styles.checkboxLabel}>
                <input
                    type={type}
                    checked={tempSelected.includes(option.id)}
                    onChange={type === 'checkbox' 
                        ? () => handleCheckboxChange(option.id)
                        : () => handleRadioChange(option.id)}
                    className={styles.checkbox}
                />
                {option.name}
            </label>
        ));
    }, [memoizedOptions, tempSelected, handleCheckboxChange, handleRadioChange, type]);

    return (
        <div className={styles.dropdown}>
            <button 
                className={`${styles.dropdownToggle} ${isOpen ? styles.dropdownToggleActive : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggle();
                }}
            >
                {label}
                {isOpen ? <UpArrowSvg /> : <DownArrowSvg />}
            </button>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    {checkboxItems}
                    <div className={styles.buttonContainer}>
                        <button 
                            onClick={handleSave}
                            className={styles.saveButton}
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
