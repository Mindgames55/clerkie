import styles from './page.module.css'
import FriendsList from '@/components/friends/FriendsList'
import ServerFriendsList from '@/components/friends/ServerFriendsList'
import Filter from '@/components/friends/filter/Filter'

// uncomment to test loading screen and make Friends await for it
/*
const pro = () => new Promise((res, rej) => {
    setTimeout(()=>{
        res()
    }, 3000);
})
*/

export default function Friends() {
    return (
        <div className={styles.container}>
            <FriendsList>
                <ServerFriendsList />
            </FriendsList>
        </div>
    )
}