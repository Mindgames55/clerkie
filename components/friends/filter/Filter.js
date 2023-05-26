'use client'
import { useState } from 'react'
import Hamburger from '../../../public/hamburger.svg'
import styles from './Filter.module.css'
import Clear from './Clear'
import Dropdown from './Dropdown'

/**
 * This function gets the initial state for the checkboxes in the dropdown.
 * @param {Array} filters
 * @returns {Object} {close: true|false, super-close:true|false}
 */
function getInitialFiltersToChecked(filters) {
    return filters.reduce((acc, filter) => {
        acc[filter.value] = filter.applied;
        return acc;
    }, {})
}

export default function Filter({filters, submitFilters, numberOfActiveFilters, clearFilters}) {
    const [isDropdownVisible, setIsDropDownVisible] = useState(false);
    /*
     need to maintain separate state for checked values as the user can select/deselect without
     triggering a filter. Filter is triggered when user clicks "Apply". the checkboxes state can also be
     cleaned by the Clear all control, so after removing all filters we reset the state of the checkboxes
     not ideal this state has been lifted up, probably using a centralized state management will improve
     readibility a lot
    */
     const [filtersChecked, setFiltersChecked] = useState(() => getInitialFiltersToChecked(filters)) // passing a f to avoid re-computing on re-renders
    
    function handleDropdownToggleVisibility() {
        setIsDropDownVisible(!isDropdownVisible)
    }

    function handleCheckboxChange({target}) {
        setFiltersChecked({
            ...filtersChecked,
            [target.name]: !filtersChecked[target.name]
        })
    }

    function clearCheckboxes() {
        const newFiltersChecked = Object.keys(filtersChecked).reduce((acc, filterChecked) => {
            acc[filterChecked] = false;
            return acc;
        }, {})
        setFiltersChecked(newFiltersChecked)
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
                <Clear handleClick={() => {
                                clearFilters()
                                clearCheckboxes()
                        }}
                        isDisabled={numberOfActiveFilters === 0}/>
            </div>
            <Dropdown isVisible={isDropdownVisible}
                      toggleVisibility={handleDropdownToggleVisibility}
                      filters={filters}
                      submitFilters={() => submitFilters(filtersChecked)}
                      numberOfActiveFilters={numberOfActiveFilters}
                      filtersChecked={filtersChecked}
                      clearCheckboxes={clearCheckboxes}
                      handleCheckboxChange={handleCheckboxChange}
                      />
        </div>
    )
}