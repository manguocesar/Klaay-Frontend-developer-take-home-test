import { render } from '@testing-library/react';
import { ProtectedRoute } from './index';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('react-router', () => ({
    Navigate: jest.fn(({ to }) => `Redirected to ${to}`),
}));

describe('ProtectedRoute', () => {
    const mockChildren = <div>Protected Content</div>;

    it('renders children when the user is authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ token: 'fake-token' });

        // Render the ProtectedRoute with children
        const { getByText } = render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);

        // Assert that the children are rendered
        expect(getByText('Protected Content')).toBeInTheDocument();
    });

});