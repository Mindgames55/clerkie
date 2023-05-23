import { render } from '@testing-library/react';
import Loading from '@/app/friends/loading';

it('renders Loading correctly', () => {
  const { container } = render(<Loading />);
  expect(container).toMatchSnapshot();
});