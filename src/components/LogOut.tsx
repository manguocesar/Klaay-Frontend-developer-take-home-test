import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const LogOut = () => {
    const navigate = useNavigate();
    const { removeAuthToken } = useAuth();

    const handleLogout = () => {
        removeAuthToken();
        navigate('/login');
    };

    return (
        <Button
            className="fixed top-3 left-2 font-semibold p-3 border border-black rounded-full md:rounded-md hover:opacity-60"
            onClick={handleLogout}
        >
            <span className="hidden md:block">Log out</span>
            <LogOutIcon className="md:hidden" />
        </Button>
    );
};

export { LogOut };