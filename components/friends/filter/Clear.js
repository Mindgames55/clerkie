import styles from './Clear.module.css'

export default function Clear({handleClick, isDisabled}) {
    return (
        <button className={styles.clear} onClick={handleClick} disabled={isDisabled} >Clear all</button>
    )
}