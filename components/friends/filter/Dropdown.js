'use client'
import { useState } from 'react'
import styles from './Dropdown.module.css'
import Clear from './Clear'
import Close from '../../../public/close.svg';
import { HIDDEN_CLASSNAME } from '@/constants';
import { STATUS_TO_COPY } from '../Friend';

/**
 * This function gets the initial state for the checkboxes.
 * @param {Array} filters
 * @returns {Object} {close: true|false, super-close:true|false}
 */
function getInitialFiltersToChecked(filters) {
    return filters.reduce((acc, filter) => {
        acc[filter.value] = filter.applied;
        return acc;
    }, {})
}


export default function Dropdown({filters, isVisible, submitFilters, numberOfActiveFilters, toggleVisibility}) {
    /*
     need to maintain local state for checked values as the user can select/deselect without
     triggering a filter. Filter is triggered when user click "Apply"
    */
    const [filtersChecked, setFiltersChecked] = useState(() => getInitialFiltersToChecked(filters)) // passing a f to avoid re-computing on re-renders
   
    const isAnyCheckboxChecked = Object.keys(filtersChecked).some(filter => filtersChecked[filter])

    function handleChange({target}) {
        setFiltersChecked({
            ...filtersChecked,
            [target.name]: !filtersChecked[target.name]
        })
    }

    function clearFilters() {
        const newFiltersChecked = Object.keys(filtersChecked).reduce((acc, filterChecked) => {
            acc[filterChecked] = false;
            return acc;
        }, {})
        setFiltersChecked(newFiltersChecked)
    }
    
    const dropdownClassName = `${styles.container} ${!isVisible ? HIDDEN_CLASSNAME : ''}`;
    return (
        <div className={dropdownClassName}>
            <header className={styles.header}>
                <div className={styles.box}>
                    <Clear handleClick={clearFilters} isDisabled={!isAnyCheckboxChecked}/>
                    {numberOfActiveFilters > 0 && <span>{numberOfActiveFilters}</span>}
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
                            <input className={styles.checkbox} type="checkbox" id={value} name={value} checked={filtersChecked[value]} onChange={handleChange} />
                        </li>
                    ))}
                </ul>
                <button className={styles.apply} onClick={() => {submitFilters(filtersChecked)}}>Apply</button>
            </div>
        </div>
    )
}