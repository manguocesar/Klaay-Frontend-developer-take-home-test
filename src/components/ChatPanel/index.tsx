import { useChatContext } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { getMessage } from '../../lib/useChats';
import { Chat } from '../../types';
import { MessageForm } from '../MessageForm';
import { ChatHeader } from '../ChatHeader';
import { MessagesContainer } from '../MessagesContainer';
import { ErrorMessage } from '../ErrorMessage';

const ChatPanel = () => {
    const { selectedChatId } = useChatContext();
    const { token } = useAuth();

    const {
        data: selectedChat,
        error: chatError,
        isLoading: chatLoading
    } = useQuery<Chat>({
        queryKey: ['chats', selectedChatId],
        queryFn: () => {
            if (selectedChatId) {
                if (!token) {
                    throw new Error("Authentication token is missing");
                }
                return getMessage(selectedChatId, token);
            }
            throw new Error("Chat ID is undefined");
        },
        refetchInterval: 4000,
        enabled: !!selectedChatId,
    });

    if (!selectedChatId) {
        return <div className="flex items-center justify-center h-full text-gray-500">Select a conversation to start chatting</div>;
    }

    if (chatLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (chatError || !selectedChat) {
        return <ErrorMessage message={chatError instanceof Error ? `Error: ${chatError.message}` : "Error loading chat"} />;
    }

    return (
        <div className="flex flex-col h-full w-screen md:w-full">
            <ChatHeader chatName={selectedChat.attributes.name} />
            <MessagesContainer selectedChat={selectedChat} />
            <MessageForm />
        </div>
    );
}

export { ChatPanel }