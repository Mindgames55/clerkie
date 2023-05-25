import styles from './Dropdown.module.css'
import Clear from './Clear'
import Close from '../../../public/close.svg';
import { HIDDEN_CLASSNAME } from '@/constants';
import { STATUS_TO_COPY } from '../Friend';

// get rid of statuses default values when these get passed
export default function Dropdown({statuses = ['close', 'super-close'], isVisible}) {
    const dropdownClassName = `${styles.container} ${!isVisible ? HIDDEN_CLASSNAME : ''}`;
    
    return (
        <div className={dropdownClassName}>
            <header className={styles.header}>
                <div className={styles.box}>
                    <Clear />
                </div>
                <div className={styles.box}>
                    <span className={styles.title}>Filter</span>
                </div>
                <div className={styles.box}>
                    <button aria-label='close'>
                        <Close />
                    </button>
                </div>
            </header>
            <div className={styles['filter-container']}>
                <p className={styles['status-title']}>Friend Status</p>
                <ul className={styles.options}>
                    {statuses.map(status => (
                        <li key={status} className={styles.option}>
                            <span className={styles['option-copy']}>{STATUS_TO_COPY[status]}</span>
                            <input type="checkbox" className={styles.checkbox}/>
                        </li>
                    ))}
                </ul>
                <button className={styles.apply}>Apply</button>
            </div>
        </div>
    )
}