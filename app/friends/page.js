import styles from './page.module.css'
import Friend from '../../components/friends/Friend'

// TODO use real data, remove Friend in favor of FriendList
const friendMock = {
    first_name: 'Jhon',
    last_name: 'Smith',
    email: 'email@gmail.com',
    'phone number': '(555) 456 4567',
    status: 'close'
}

export default function Friends() {
    return (
        <div className={styles.container}>
            {/* <FriendsList /> */}
            <ul><Friend friend={friendMock}/></ul>
        </div>
    )
}