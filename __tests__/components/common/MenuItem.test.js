import { useSelectedLayoutSegment } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import MenuItem from '@/components/common/MenuItem';

jest.mock('next/navigation', () => ({
    useSelectedLayoutSegment: jest.fn(), // return undefined for base route
}))
 
it('renders correctly', () => {
    const props = {
        href: '/',
        title: 'title',
    }
    const { container } = render(<MenuItem {...props} />);
    expect(container).toMatchSnapshot();
});