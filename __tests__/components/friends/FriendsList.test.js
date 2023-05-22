import { render } from '@testing-library/react';
import FriendsList from '../../../components/friends/FriendsList';

it('renders FriendsList correctly', () => {
    const { container } = render(<FriendsList />);
    expect(container).toMatchSnapshot();
});