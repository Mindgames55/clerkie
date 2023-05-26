import { createMocks } from 'node-mocks-http';
import handleFriend from '../pages/api/friends'
import data from '../json/MOCK_DATA';

describe('/api/friend', () => {
    test('returns an array of the first 2 friends', async () => {
        const expectedData = {
            friends: data.slice(0, 2),
            done: false
        };
        const { req, res } = createMocks({
        query: {
            limit: '2'
        },
        });

        await handleFriend(req, res);

        expect(res._getStatusCode()).toBe(200);
        const receivedData = JSON.parse(res._getData());
        expect(receivedData.friends.length).toBe(2);
        expect(receivedData).toEqual(expectedData)
    });

    test('returns an array of the first 2 friends that has status close', async () => {
         // hardcoding the items to avoid using same filter implementation than the tested code
        const expectedData = {
            friends: [data[0], data[2]],
            done: false
        }

        const { req, res } = createMocks({
        query: {
            limit: '2',
            status: 'close'
        },
        });

        await handleFriend(req, res);

        expect(res._getStatusCode()).toBe(200);
        const receivedData = JSON.parse(res._getData());
        expect(receivedData.friends.length).toBe(2);
        expect(receivedData).toEqual(expectedData)
    });
});