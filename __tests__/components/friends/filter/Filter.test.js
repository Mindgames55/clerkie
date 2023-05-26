import { render, screen } from '@testing-library/react';
import Filter from '@/components/friends/filter/Filter'

export const props = {
    filters: [{
        filter: 'status',
        value: 'close',
        applied: false
    }],
    numberOfActiveFilters: 3
}

it('renders Filter correctly', () => {
    const { container } = render(<Filter {...props} />);
    expect(container).toMatchSnapshot();
});