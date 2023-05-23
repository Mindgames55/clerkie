import styles from './page.module.css'
import FriendsList from '@/components/friends/FriendsList'
import ServerFriendsList from '@/components/friends/ServerFriendsList'

export default function Friends() {
    return (
        <div className={styles.container}>
            <FriendsList>
                <ServerFriendsList />
            </FriendsList>
        </div>
    )
}