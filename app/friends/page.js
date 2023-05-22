import styles from './page.module.css'
import FriendsList from '../../components/friends/FriendsList'

export default function Friends() {
    return (
        <div className={styles.container}>
            <FriendsList />
        </div>
    )
}