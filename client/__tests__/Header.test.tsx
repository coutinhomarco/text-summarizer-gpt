import { render, screen } from '@testing-library/react';
import Header from '../src/components/header';
import { AuthProvider } from '../src/context/authContext';
import mockRouter from 'next-router-mock';

describe('Header', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('renders the header with title', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const title = screen.getByText(/Text Summarizer/i);
    expect(title).toBeInTheDocument();
  });

  it('renders login button when not authenticated', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });
});
