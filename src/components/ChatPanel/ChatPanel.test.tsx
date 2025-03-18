import { render, screen } from '@testing-library/react';
import { ChatPanel } from './index';
import { useChatContext } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { mockToken } from '../../constants';

jest.mock('../../context/ChatContext', () => ({
    useChatContext: jest.fn(),
}));

jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('lucide-react', () => ({
    Loader2: () => <div data-testid="loading-spinner">Loading Spinner</div>,
    ChevronLeft: () => <div>Back</div>,
}));

jest.mock('../MessageForm', () => ({
    MessageForm: () => <div data-testid="message-form">Message Form</div>,
}));

jest.mock('../ChatHeader', () => ({
    ChatHeader: ({ chatName }: { chatName: string }) => <div data-testid="chat-header">{chatName}</div>,
}));

jest.mock('../MessagesContainer', () => ({
    MessagesContainer: () => <div data-testid="messages-container">Messages</div>,
}));

describe('ChatPanel', () => {
    const mockUseChatContext = useChatContext as jest.Mock;
    const mockUseAuth = useAuth as jest.Mock;
    const mockUseQuery = useQuery as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        // Give useQuery a default return value to prevent destructuring errors
        mockUseQuery.mockReturnValue({
            data: undefined,
            error: null,
            isLoading: false,
        });
    });

    it('renders the chat panel when chat data is successfully fetched', () => {
        mockUseChatContext.mockReturnValue({ selectedChatId: '1' });
        mockUseAuth.mockReturnValue({ token: mockToken });

        mockUseQuery.mockReturnValue({
            data: {
                id: '1',
                type: 'chat',
                attributes: {
                    name: 'Test Chat',
                    messages: [],
                },
            },
            error: null,
            isLoading: false,
        });

        render(<ChatPanel />);

        // Check that the chat panel is rendered
        expect(screen.getByText('Test Chat')).toBeInTheDocument(); // ChatHeader
        expect(screen.getByTestId('messages-container')).toBeInTheDocument();
        expect(screen.getByTestId('message-form')).toBeInTheDocument();
    });
});