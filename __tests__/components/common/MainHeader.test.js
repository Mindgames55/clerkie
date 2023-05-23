import { useSelectedLayoutSegment } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import MainHeader from '@/components/common/MainHeader';

jest.mock('next/navigation', () => ({
    useSelectedLayoutSegment: jest.fn(), // return undefined for base route
}))
 
it('renders mainHeader as Home when segment is Home', () => {
    render(<MainHeader />);

    const heading = screen.getByRole('heading', {
        name: /Home/i
    });
 
    expect(heading).toBeInTheDocument();
});

it('renders mainHeader as Friends when segment is Friends', () => {
    useSelectedLayoutSegment.mockReturnValueOnce('friends')
    render(<MainHeader />);
    const heading = screen.getByRole('heading', {
        name: /Friends/i
    });
 
    expect(heading).toBeInTheDocument();
});

it('renders correctly', () => {
    const { container } = render(<MainHeader />);
    expect(container).toMatchSnapshot();
});