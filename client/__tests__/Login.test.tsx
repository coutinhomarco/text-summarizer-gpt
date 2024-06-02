import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/login';
import { AuthProvider } from '../src/context/authContext';

describe('Login Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders login form', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameLabel = screen.getByLabelText(/Username/i);
    const passwordLabel = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('shows error message on failed login', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongPass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
