import { render } from '@testing-library/react';
import FriendsList from '@/components/friends/FriendsList';

jest.mock('../../../components/hooks/useIntersectionObserver.js')
jest.mock('../../../components/hooks/useFriends.js', () => () => ({
    friends: [],
    loading: false,
    getFriends: jest.fn()
}))
it('renders FriendsList correctly', () => {
    const { container } = render(<FriendsList />);
    expect(container).toMatchSnapshot();
});