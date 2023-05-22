import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';
 
describe('Home', () => {
  it('renders the static copy correctly', () => {
    render(<Home />);
 
    const paragraph = screen.getByText(/Welcome to the Clerkie Challenge!/i);
 
    expect(paragraph).toBeInTheDocument();
  });
});