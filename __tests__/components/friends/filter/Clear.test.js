import { render, screen } from '@testing-library/react';
import Clear from '@/components/friends/filter/Clear'

it('renders Clear button correctly', () => {
    const { container } = render(<Clear />);
    expect(container).toMatchSnapshot();
});