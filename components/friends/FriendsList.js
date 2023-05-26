'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './FriendsList.module.css'
import loaderStyles from '../../app/friends/loading.module.css'
import Friend from './Friend';
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useFriends from '../hooks/useFriends';
import Filter from './filter/Filter';

const initialFilters = [
    {
        filter: 'status',
        value: 'close',
        applied: false
    },
    {
        filter: 'status',
        value: 'super-close',
        applied: false
    }
]

export default function FriendsList({children}) {
    const targetRef = useRef(null)
    const {friends, getFriends, loading, done, sliceFriends } = useFriends()
    const isIntersecting = useIntersectionObserver(targetRef?.current, done);
    const page = useRef(1)
    const [filters, setFilters] = useState(initialFilters);
    const noFilterLoadedFriendsMark = useRef(0);

    // derived values from state, needed work would be done here  and passed
    // to child components that need then to avoid re-computing in those components 
    const activeFilters = filters.filter(filter => filter.applied);
    const isAnyFilterApplied = activeFilters.length > 0;
    // set of filter values ['close' , 'super-close] to compare against when filtering friends
    const activeFilterValues = new Set(activeFilters.map(({value}) => value));
    const visibleFriends = !isAnyFilterApplied ? friends : friends.filter(friend => activeFilterValues.has(friend.status))
    const shouldLoadMore = isIntersecting && !loading;

    function submitFilters(filterToActiveMap) {
        setFilters(filters.map(filter => ({
            ...filter,
            applied: filterToActiveMap[filter.value]
        })))
    }

    function clearFilters() {
        setFilters(filters.map(filter => ({
            ...filter,
            applied: false
        })))
        // we also want to strip all the loaded data with a particular filter
        // because upon clearing all filters we want to be able the FE "recovers" the lost data when filtering
        sliceFriends(noFilterLoadedFriendsMark.current)
    }

    if (shouldLoadMore) {
        getFriends(page.current, filters);
        page.current++;
        if (!isAnyFilterApplied) {
            noFilterLoadedFriendsMark.current = friends.length
        }
    }

    return (
        <div>
            <Filter filters={filters}
                    submitFilters={submitFilters}
                    numberOfActiveFilters={activeFilters.length}
                    clearFilters={clearFilters}
            />
            <ul>
                {/* TODO https://react.dev/reference/react/useEffect#displaying-different-content-on-the-server-and-the-client */}
                {!friends.length && children}
                {visibleFriends.map(friend => <Friend friend={friend} key={friend.id}/>)}
                {/* if unmounted the useEffect hook on useIntersectionObserver will run and disconnect the observer */}
                <div ref={targetRef} className={`${loaderStyles['loader-container']}${done ? ' hidden' : ''}`}>
                    <Image
                        className={loaderStyles.image}
                        src="/contact_placeholder.svg"
                        width={1050}
                        height={114}
                        alt="Loading"
                    />
                </div>
                {done && <p className={styles['no-results']}>No more results</p>}
            </ul>
        </div>
    )
}