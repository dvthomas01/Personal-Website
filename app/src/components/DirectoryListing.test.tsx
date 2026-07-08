import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { DirectoryListing } from './DirectoryListing';

test('renders terminal directory entries and say-hi link', () => {
  render(<DirectoryListing />, { wrapper: MemoryRouter });
  expect(screen.getByText(/drwxr-xr-x dami/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects\// })).toHaveAttribute('href', '/projects');
  expect(screen.getByRole('link', { name: /photos\// })).toHaveAttribute('href', '/photos');
  expect(screen.getByRole('link', { name: /cv\.pdf/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /github/ })).toHaveAttribute('href', 'https://github.com/dvthomas01');
  expect(screen.getByRole('link', { name: /say hi/i })).toHaveAttribute('href', 'mailto:dvthomas@mit.edu');
});
