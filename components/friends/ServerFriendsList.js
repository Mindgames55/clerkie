import path from 'path'
import { promises as fs } from 'fs';
import Friend from './Friend';

const FIRST_LOAD_LIMIT = 15; // first load number of results
const FIRST_LOAD_START = 0; // start from the beginning of the data

async function getFriendsData() {
    const dataDir = path.join(process.cwd(), 'json');
    // investigate if fs.readFile has any method to figure out the identity of the file (similar to sha-sum)
    // to support caching the data at the API level
    const fileContents = await fs.readFile(dataDir + '/MOCK_DATA.json', 'utf8');
    const data = JSON.parse(fileContents).slice(FIRST_LOAD_START, FIRST_LOAD_LIMIT);

    return data;
}

export default async function ServerFriendsList() {
    const friends = await getFriendsData();
    return (
        <>
            {friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
        </>
    )
}