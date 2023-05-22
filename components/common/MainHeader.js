'use client'

import { useSelectedLayoutSegment } from 'next/navigation';
import styles from './MainHeader.module.css'

export default function MainHeader() {
    const segment = useSelectedLayoutSegment();

    const pageHeader = !segment ? 'Home' : 'Friends';
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{pageHeader}</h1>
        </div>
    )
}