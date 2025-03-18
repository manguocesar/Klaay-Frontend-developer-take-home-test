import { render, screen, fireEvent } from '@testing-library/react';
import { MessagesContainer } from '../MessagesContainer';
import { Chat } from '@/types';

const mockSelectedChat: Chat = {
    id: '1',
    attributes: {
        name: 'Test Chat',
        author: 'user1',
        messages: [
            { id: '1', text: 'Message', author: 'user1' },
            { id: '2', text: 'Message', author: 'user2' },
            { id: '3', text: 'Message', author: 'user1' },
            { id: '4', text: 'Message', author: 'user2' },
            { id: '5', text: 'Message', author: 'user1' },
            { id: '6', text: 'Message', author: 'user2' },
            { id: '7', text: 'Message', author: 'user1' },
            { id: '8', text: 'Message', author: 'user2' },
            { id: '9', text: 'Message', author: 'user1' },
            { id: '10', text: 'Message', author: 'user2' },
            { id: '11', text: 'Message', author: 'user1' },
        ],
    },
};

describe('MessagesContainer', () => {

    it('shows all messages when the "Load older messages" button is clicked', () => {
        render(<MessagesContainer selectedChat={mockSelectedChat} />);

        const loadButton = screen.getByText('Load older messages');
        fireEvent.click(loadButton);

        const messages = screen.getAllByText('Message');
        expect(messages).toHaveLength(11);
    });

});