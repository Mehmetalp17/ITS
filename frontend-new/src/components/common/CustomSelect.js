import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './CustomSelect.css';

const CustomSelect = ({ 
    options, 
    value, 
    onChange, 
    placeholder = 'Seçiniz', 
    disabled = false, 
    className = '',
    renderLabel
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const containerRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);

    const updatePosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const minWidth = rect.width;
            
            // Check if element is in the right half of the screen
            const isRightSide = rect.left > window.innerWidth / 2;

            const style = {
                top: `${rect.bottom + window.scrollY + 4}px`,
                minWidth: `${minWidth}px`,
                width: 'max-content',
                position: 'absolute',
                zIndex: 9999
            };

            if (isRightSide) {
                // Align right edge of dropdown with right edge of trigger
                // Calculate distance from right edge of document
                const docWidth = document.documentElement.scrollWidth;
                const rightPos = docWidth - (rect.right + window.scrollX);
                style.right = `${rightPos}px`;
                style.left = 'auto';
            } else {
                // Align left
                style.left = `${rect.left + window.scrollX}px`;
                style.right = 'auto';
            }

            setDropdownStyle(style);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                // Also check if the click is inside the portal dropdown
                const dropdownEl = document.querySelector('.custom-select-options-portal');
                if (dropdownEl && dropdownEl.contains(event.target)) {
                    return;
                }
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            if (isOpen) {
               // Update position or close on scroll to avoid detachment
               updatePosition(); 
            }
        };

        const handleResize = () => {
             if (isOpen) updatePosition();
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true); // true for capturing scroll in all elements
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    // Update position when opening
    useEffect(() => {
        if (isOpen) {
            updatePosition();
        }
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select-wrapper ${className}`} ref={containerRef}>
            <div 
                className={`custom-select-trigger ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`} 
                onClick={handleToggle}
            >
                <span>
                    {selectedOption 
                        ? (renderLabel ? renderLabel(selectedOption) : selectedOption.label) 
                        : placeholder}
                </span>
                <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
            </div>
            
            {isOpen && ReactDOM.createPortal(
                <div 
                    className={`custom-select-options custom-select-options-portal ${className.includes('table-select') ? 'small-text' : ''}`}
                    style={dropdownStyle}
                >
                    {options.map((option) => (
                        <div 
                            key={option.value} 
                            className={`custom-option ${option.value === value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {renderLabel ? renderLabel(option) : option.label}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default CustomSelect;
