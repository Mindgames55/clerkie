import { render, screen } from '@testing-library/react';
import Dropdown from '@/components/friends/filter/Dropdown'

const props = {
    statuses: ['close', 'super-close'],
    isVisible: true
}

it('renders Dropdown correctly', () => {
    const { container } = render(<Dropdown {...props} />);
    expect(container).toMatchSnapshot();
});