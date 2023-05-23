import { render } from '@testing-library/react';
import SideMenu from '@/components/common/SideMenu';

jest.mock('next/navigation', () => ({
    useSelectedLayoutSegment: jest.fn(), // return undefined for base route
}))

it('renders SideMenu correctly', () => {
  const { container } = render(<SideMenu />);
  expect(container).toMatchSnapshot();
});