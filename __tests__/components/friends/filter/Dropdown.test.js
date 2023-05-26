import { render, screen } from '@testing-library/react';
import Dropdown from '@/components/friends/filter/Dropdown'
import {props as filterProps} from './Filter.test'

const props = {
    isVisible: true,
    filtersChecked: {
        close: true
    },
    handleCheckboxChange: jest.fn(),
    ...filterProps
}

it('renders Dropdown correctly', () => {
    const { container } = render(<Dropdown {...props} />);
    expect(container).toMatchSnapshot();
});