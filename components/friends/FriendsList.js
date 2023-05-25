'use client'

import { useState, useRef } from 'react';
import loaderStyles from '../../app/friends/loading.module.css'
import Friend from './Friend';
import PlaceHolder from '../../public/contact_placeholder.svg'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useFriends from '../hooks/useFriends';
import Filter from './filter/Filter';

export default function FriendsList({children}) {
    const targetRef = useRef(null)
    const isIntersecting = useIntersectionObserver(targetRef?.current);
    const {friends, getFriends, loading } = useFriends()
    const page = useRef(1)

    const shouldLoadMore = isIntersecting && !loading;

    if (shouldLoadMore) {
        getFriends(page.current);
        page.current++;
    }

    return (
        <div>
            <Filter />
            <ul>
                {/* TODO https://react.dev/reference/react/useEffect#displaying-different-content-on-the-server-and-the-client */}
                {!friends.length && children}
                {friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
                <div ref={targetRef}>
                    <PlaceHolder className={loaderStyles.loader}/>
                </div>
            </ul>
        </div>
    )
}