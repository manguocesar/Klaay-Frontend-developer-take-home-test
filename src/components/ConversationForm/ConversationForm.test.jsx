import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConversationForm } from './index';
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationSchema } from "../../lib/zod";
import { mockToken } from '../../constants';

jest.mock('../../context/AuthContext');
jest.mock('@tanstack/react-query');
jest.mock('../../lib/useConversation');
jest.mock('../../lib/zod', () => ({
    conversationSchema: {
        parse: jest.fn()
    }
}));
jest.mock('../ErrorMessage', () => ({
    ErrorMessage: ({ message }) => <div data-testid="error-message">{message}</div>
}));

describe('ConversationForm', () => {
    const mockQueryClient = {
        invalidateQueries: jest.fn()
    };
    const mockMutateAsync = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useAuth.mockReturnValue({ token: mockToken });
        useQueryClient.mockReturnValue(mockQueryClient);
        useMutation.mockReturnValue({
            mutateAsync: mockMutateAsync,
            isPending: false
        });
        conversationSchema.parse.mockImplementation(() => true);
    });

    test('enables the button when input has value', () => {
        render(<ConversationForm />);

        const input = screen.getByPlaceholderText('New Conversation Name...');
        fireEvent.change(input, { target: { value: 'Test Conversation' } });

        expect(screen.getByRole('button', { name: /create new conversation/i })).not.toBeDisabled();
    });

    test('disables the button when token is null', () => {
        useAuth.mockReturnValue({ token: null });

        render(<ConversationForm />);

        const input = screen.getByPlaceholderText('New Conversation Name...');
        fireEvent.change(input, { target: { value: 'Test Conversation' } });

        expect(screen.getByRole('button', { name: /create new conversation/i })).toBeDisabled();
    });

    test('creates conversation when form is submitted', async () => {
        mockMutateAsync.mockResolvedValueOnce({ id: '123', name: 'Test Conversation' });

        render(<ConversationForm />);

        const input = screen.getByPlaceholderText('New Conversation Name...');
        fireEvent.change(input, { target: { value: 'Test Conversation' } });

        const button = screen.getByRole('button', { name: /create new conversation/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(conversationSchema.parse).toHaveBeenCalledWith({ name: 'Test Conversation' });
            expect(mockMutateAsync).toHaveBeenCalledWith({
                name: 'Test Conversation',
                token: mockToken
            });
            expect(input.value).toBe('Test Conversation');
        });
    });

});