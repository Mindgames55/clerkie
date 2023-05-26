import styles from './Clear.module.css'

export default function Clear({handleClick, isDisabled, isBlue = false}) {
    return (
        <button className={(isBlue && !isDisabled) ? styles['clear-blue'] : styles.clear} onClick={handleClick} disabled={isDisabled} >Clear all</button>
    )
}