import React from "react";
import { render } from '@testing-library/react';
import Friends from '@/app/friends/page';

// need to mock the server component as jest doesn't support async components
jest.mock('../../components/friends/ServerFriendsList', () => () => {
  const ReactComponent = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
  ReactComponent.displayName = 'ReactComponentMock'
})

describe('Friends', () => {
  it('renders correctly', async () => {
    const { container } = render(<Friends />);
    expect(container).toMatchSnapshot();
  });
});