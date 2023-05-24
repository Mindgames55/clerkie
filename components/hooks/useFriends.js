import { useState, useEffect } from 'react';

export const BASE_API_URL = '/api/friends';

export const fetcher = async (url) => {
    const data = await (await (fetch(url))).json();
    return data;
}

export default function useFriends() {
    const [ friends, setFriends ] = useState([]);
    const [loading, setLoading] = useState(false);

    /* 
        this useEffect hook adds to the state the same friends as the server component (initial friends)
        to have available that in the FE to be able to filter whatever is already rendered
    */
    useEffect(() => {
        let ignore = false;

        async function fetchFriends() {
            const friends =  await fetcher(BASE_API_URL);
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

    const getFriends = async (page) => {
        setLoading(true)
        const url = `${BASE_API_URL}?page=${page}`
        fetcher(url)
            .then(newFriends => {
                setFriends([...friends, ...newFriends])
                setLoading(false)
            })
            .catch(() => {
                // no-op
                setLoading(false)
            });
    }

    return {
        friends,
        loading,
        getFriends
    };
}
