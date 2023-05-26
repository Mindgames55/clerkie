import { render, screen } from '@testing-library/react';
import Dropdown from '@/components/friends/filter/Dropdown'
import {props as filterProps} from './Filter.test'

const props = {
    statuses: ['close', 'super-close'],
    isVisible: true,
    ...filterProps
}

it('renders Dropdown correctly', () => {
    const { container } = render(<Dropdown {...props} />);
    expect(container).toMatchSnapshot();
});