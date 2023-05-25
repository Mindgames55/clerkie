'use client'
import { useState } from 'react'
import Hamburger from '../../../public/hamburger.svg'
import styles from './Filter.module.css'
import Clear from './Clear'
import Dropdown from './Dropdown'

export default function Filter() {
    const [isDropdownVisible, setIsDropDownVisible] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button className={styles.filter}
                        aria-label='filter by status'
                        onClick={() => setIsDropDownVisible(!isDropdownVisible)}
                        >
                            <Hamburger />
                </button>
                <span className={styles.separator}>|</span>
                <Clear />
            </div>
            <Dropdown isVisible={isDropdownVisible}/>
        </div>
    )
}