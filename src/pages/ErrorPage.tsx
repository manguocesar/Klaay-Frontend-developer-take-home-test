import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='flex flex-col justify-center'>
            <h1>Page not found! 404 Error</h1>
            <Button onClick={handleGoToLogin}>Go to Login</Button>
        </div>
    );
};

export default ErrorPage;