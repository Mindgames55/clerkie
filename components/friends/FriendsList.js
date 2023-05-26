'use client'

import { useState, useRef } from 'react';
import loaderStyles from '../../app/friends/loading.module.css'
import Friend from './Friend';
import PlaceHolder from '../../public/contact_placeholder.svg'
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
    const isIntersecting = useIntersectionObserver(targetRef?.current);
    const {friends, getFriends, loading } = useFriends()
    const page = useRef(1)
    const [filters, setFilters] = useState(initialFilters);

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
        setFilters.map(filter => ({
            ...filter,
            applied: false
        }))
    }

    if (shouldLoadMore) {
        getFriends(page.current, filters);
        page.current++;
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
                <div ref={targetRef}>
                    <PlaceHolder className={loaderStyles.loader}/>
                </div>
            </ul>
        </div>
    )
}