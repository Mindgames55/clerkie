'use client'
import { useState } from 'react'
import styles from './Dropdown.module.css'
import Clear from './Clear'
import Close from '../../../public/close.svg';
import { HIDDEN_CLASSNAME } from '@/constants';
import { STATUS_TO_COPY } from '../Friend';

export default function Dropdown({
    filters,
    isVisible,
    submitFilters,
    numberOfActiveFilters,
    toggleVisibility,
    filtersChecked,
    clearCheckboxes,
    handleCheckboxChange
}) {
    
    const isAnyCheckboxChecked = Object.keys(filtersChecked).some(filter => filtersChecked[filter])
    const dropdownClassName = `${styles.container} ${!isVisible ? HIDDEN_CLASSNAME : ''}`;
    return (
        <div className={dropdownClassName}>
            <header className={styles.header}>
                <div className={styles.box}>
                    <Clear handleClick={clearCheckboxes} isDisabled={!isAnyCheckboxChecked} isBlue={true} />
                </div>
                <div className={styles.box}>
                    <span className={styles.title}>Filter</span>
                </div>
                <div className={styles.box}>
                    <button aria-label='close' onClick={toggleVisibility}>
                        <Close />
                    </button>
                </div>
            </header>
            <div className={styles['filter-container']}>
                <p className={styles['status-title']}>Friend Status</p>
                <ul className={styles.options}>
                    {filters.map(({value, applied}) => (
                        <li key={value} className={styles.option}>
                            <label className={styles['option-copy']} htmlFor={value}>{STATUS_TO_COPY[value]}</label>
                            <input className={styles.checkbox} type="checkbox" id={value} name={value} checked={filtersChecked[value]} onChange={handleCheckboxChange} />
                        </li>
                    ))}
                </ul>
                <button className={styles.apply}
                        onClick={() => {
                                submitFilters()
                                toggleVisibility()
                            }}>
                            Apply
                </button>
            </div>
        </div>
    )
}