import { useState, useEffect } from 'react';
import getQueryParamString from '@/utils/get-query-param-string';

export const BASE_API_URL = '/api/friends';

export const fetcher = async (url) => {
    const data = await (await (fetch(url))).json();
    return data;
}

export default function useFriends() {
    const [ friends, setFriends ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    
    /* 
        this useEffect hook adds to the state the same friends as the server component (initial friends)
        to have available that in the FE to be able to filter whatever is already rendered
    */
    useEffect(() => {
        let ignore = false;

        async function fetchFriends() {
            const {friends} =  await fetcher(BASE_API_URL);
            if (!ignore) {
                setFriends(f => [...f, ...friends])
            }
        }

        fetchFriends();
        // not relevant now that states lives locally but important when moving state up with context
        return () => {
            ignore = true;
        }
    }, [])

    const getFriends = async (page, filters) => {
        setLoading(true);
  
        const friendsQPs = getFriendsQPs(page, filters);

        fetcher(BASE_API_URL + getQueryParamString(friendsQPs))
            .then(({friends: newFriends, done}) => {
                setFriends([...friends, ...newFriends])
                setLoading(false)
                setDone(done)
            })
            .catch(() => {
                // no-op
                setLoading(false)
            });
    }

    /**
     * This method exposes a way to strip friends. 
     * @param {Number} end - the index that will mark the end of the sliced array
     */
    const sliceFriends = (end) => {
        if (end !== friends.length) {
            // means there are more results
            setDone(false)
        }
        setFriends(friends.slice(0,end+1))
    }

    return {
        friends,
        loading,
        done,
        getFriends,
        sliceFriends
    };
}
/**
 * Returns an array of QPs containing the page and applied filters
 * @param {Number} page 
 * @param {Array} filters - the possible filters, the function filters the incative ones
 * @returns {Array} - an array of query params standardize in the form {name, value}
 */
function getFriendsQPs(page, filters) {
    const appliedFilters = filters.filter(filter => filter.applied);
    const filterQpMap = appliedFilters.map(filter => ({
        name: 'status',
        value: filter.value
    }))
    const pageQpMap = {
        name: 'page',
        value: page
    }

    return [...filterQpMap, pageQpMap];
}
