import PlaceHolder from '../../public/contact_placeholder.svg'
import styles from './page.module.css'
import Hamburger from '../../public/hamburger.svg'
import filterStyles from '../../components/friends/filter/Filter.module.css'
import clearStyles from '../../components/friends/filter/Clear.module.css'
import loaderStyles from './loading.module.css'

// dummy filter controls component to show on loading screen
function FilterLoad() {
    return (
        <div className={filterStyles.container}>
            <div className={filterStyles.controls}>
                <button className={filterStyles.filter}>
                    <Hamburger />
                </button>
                <span className={filterStyles.separator}>|</span>
                <button className={clearStyles.clear}>Clear all</button>
            </div>
        </div>
    )
}

export default function Loading() {
    return (
        <div className={styles.container}>
            <FilterLoad />
            {Array(9).fill('unused').map((el, idx) => (
                    // acceptable to use the id since these components will never change order
                    <PlaceHolder key={idx} className={loaderStyles.loader}/>
            ))}
        </div>
        
    )
}