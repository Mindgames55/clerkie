import styles from './Friend.module.css'

const STATUS_TO_COPY = {
    close: 'Close Friends',
    'super-close': 'Super Close Friends'
}

export default function Friend({friend}) {
    const {first_name: firstName, last_name: lastName} = friend;
    const fullName = `${firstName} ${lastName}`;

    return (
        <li className={styles.container}>
            <span className={styles.name}>{fullName}</span>
            {friend.status !== 'default' && <span className={styles[friend.status]}>{STATUS_TO_COPY[friend.status]}</span>}
            <span className={styles.metadata}>
                <span className={styles.email}>{friend.email}</span>
                <span>{friend.phone_number}</span>
            </span>
        </li>
    )
}