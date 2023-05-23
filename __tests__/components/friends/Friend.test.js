import { render, screen } from '@testing-library/react';
import Friend from '@/components/friends/Friend';
import friendMock from './friend.json'

it('renders Friend correctly', () => {
    const { container } = render(<Friend friend={friendMock}/>);
    expect(container).toMatchSnapshot();
});

it('renders Friend correctly when status is not default', () => {
    render(<Friend friend={{...friendMock, status: 'close'}}/>);
    const span = screen.getByText(/Close Friends/i);
    expect(span).toBeInTheDocument();
});