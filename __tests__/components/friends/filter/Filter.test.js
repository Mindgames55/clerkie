import { render, screen } from '@testing-library/react';
import Filter from '@/components/friends/filter/Filter'

it('renders Filter correctly', () => {
    const { container } = render(<Filter />);
    expect(container).toMatchSnapshot();
});