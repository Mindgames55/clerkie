'use client'

import { useState, useEffect, useContext } from 'react';
import styles from './FriendsList.module.css'
import Friend from './Friend';
import { FriendsContext, FriendsDispatchContext } from '@/app/friends-provider';

export default function FriendsList({children}) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const friends = useContext(FriendsContext);
    const dispatch = useContext(FriendsDispatchContext);

    useEffect(() => {
        fetch('/api/friends')
            .then(data => data.json())
            .then(data => {
                setTimeout(() => {
                    dispatch({
                        type: 'add',
                        friends: data
                    })
                }, 3000)
            })
    }, [])


    return (
        <ul className={styles.container}>
            {friends.length}
            {friends.map(friend => <Friend client={true} friend={friend} key={friend.id}/>)}
            {!friends.length && children}
        </ul>
    )
}