import { Navigate } from 'react-router';
import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export { ProtectedRoute };