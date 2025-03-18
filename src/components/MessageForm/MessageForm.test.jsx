import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MessageForm } from '../MessageForm';
import { useChatContext } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mockToken } from '../../constants';

jest.mock('../../context/ChatContext');
jest.mock('../../context/AuthContext');
jest.mock('@tanstack/react-query');
jest.mock('../../lib/useChats');
jest.mock('../ErrorMessage', () => ({
    ErrorMessage: ({ message }) => <div data-testid="error-message">{message}</div>
}));

describe('MessageForm', () => {
    const mockSelectedChatId = 'chat-123';
    const mockQueryClient = {
        invalidateQueries: jest.fn()
    };
    const mockMutateAsync = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useChatContext.mockReturnValue({ selectedChatId: mockSelectedChatId });
        useAuth.mockReturnValue({ token: mockToken });
        useQueryClient.mockReturnValue(mockQueryClient);
        useMutation.mockReturnValue({
            mutateAsync: mockMutateAsync,
            isPending: false
        });
    });

    test('sends message when clicking send button', async () => {
        render(<MessageForm />);

        const input = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(input, { target: { value: 'Hello world' } });

        const sendButton = screen.getByRole('button', { name: /send message/i });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith({
                text: 'Hello world',
                selectedChatId: mockSelectedChatId,
                token: mockToken
            });
        });
    });

    test('sends message when pressing Enter key', async () => {
        render(<MessageForm />);

        const input = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(input, { target: { value: 'Hello world' } });
        fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith({
                text: 'Hello world',
                selectedChatId: mockSelectedChatId,
                token: mockToken
            });
        });
    });

    test('shows error message when message is empty', async () => {
        render(<MessageForm />);

        const sendButton = screen.getByRole('button', { name: /send message/i });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toHaveTextContent('Message cannot be empty.');
            expect(mockMutateAsync).not.toHaveBeenCalled();
        });
    });


    test('clears error message when input changes', async () => {
        render(<MessageForm />);

        const sendButton = screen.getByRole('button', { name: /send message/i });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
        });

        // Then change the input
        const input = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(input, { target: { value: 'Hello world' } });

        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
});