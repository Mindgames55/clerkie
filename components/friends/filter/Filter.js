'use client'
import { useState } from 'react'
import Hamburger from '../../../public/hamburger.svg'
import styles from './Filter.module.css'
import Clear from './Clear'
import Dropdown from './Dropdown'

export default function Filter({filters, submitFilters, numberOfActiveFilters, clearFilters}) {
    const [isDropdownVisible, setIsDropDownVisible] = useState(false);

    function handleDropdownToggleVisibility() {
        setIsDropDownVisible(!isDropdownVisible)
    }

    const isFilterButtonActive = isDropdownVisible || numberOfActiveFilters > 0;
    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button className={isFilterButtonActive ? styles['active-filter'] : styles.filter}
                        aria-label='filter by status'
                        onClick={handleDropdownToggleVisibility}
                        >
                            <Hamburger />
                            {numberOfActiveFilters > 0 && <span className={styles['filter-number']}>{numberOfActiveFilters}</span>}
                </button>
                <span className={styles.separator}>|</span>
                <Clear handleClick={clearFilters} isDisabled={numberOfActiveFilters === 0}/>
            </div>
            <Dropdown isVisible={isDropdownVisible} toggleVisibility={handleDropdownToggleVisibility} filters={filters} submitFilters={submitFilters} numberOfActiveFilters={numberOfActiveFilters} />
        </div>
    )
}