import PlaceHolder from '../../public/contact_placeholder.svg'
import styles from './loading.module.css'

export default function Loading() {
    return (
        <div className={styles.container}>
            {Array(9).fill('unused').map((el, idx) => (
                    // acceptable to use the id since these components will never change order
                    <PlaceHolder key={idx} className={styles.loader}/>
            ))}
        </div>
        
    )
}