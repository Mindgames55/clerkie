'use client'

import { useState } from 'react';
import styles from './FriendsList.module.css'
import Friend from './Friend';

// TODO use real data
const friendMock = [{
    first_name: 'Jhon',
    last_name: 'Smith',
    email: 'email@gmail.com',
    'phone number': '(555) 456 4567',
    status: 'close',
    id: '1'
}]

export default function FriendsList({children}) {
    const [ isInitialLoad, setInitialLoad ] = useState(true);
    const friends = friendMock
    // TODO figure out a way to avoid using magic 80px
    return (
        <ul className={styles.container}>
            {isInitialLoad && children}
            {friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
        </ul>
    )
}