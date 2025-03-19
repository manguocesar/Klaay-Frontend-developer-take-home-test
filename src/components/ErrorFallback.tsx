import { FallbackProps } from 'react-error-boundary';
import { Button } from './ui/button';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p>{error.message}</p>
            <Button
                onClick={resetErrorBoundary}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Try again
            </Button>
        </div>
    );
};

export { ErrorFallback };
