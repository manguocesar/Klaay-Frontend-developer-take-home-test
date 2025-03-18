import { useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '../ui/input';
import { Loader2, Send } from 'lucide-react';
import { createMessage } from '../../lib/useChats';
import { Button } from '../ui/button';
import { ErrorMessage } from '../ErrorMessage';

const MessageForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { selectedChatId } = useChatContext();
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async () => {
        if (newMessage.trim().length < 1) {
            setErrorMessage("Message cannot be empty.");
            return;
        }
        if (!selectedChatId) {
            setErrorMessage("A conversation must be selected first.");
            return;
        }
        if (!token) {
            setErrorMessage("Need to login to send messages.");
            return;
        }
        setErrorMessage(null);
        await sendMessageMutation.mutateAsync({ text: newMessage, selectedChatId, token });
    };

    const sendMessageMutation = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
            setNewMessage("");
            queryClient.invalidateQueries({ queryKey: ['chats', selectedChatId] });
        },
        onError: (error: Error) => {
            setErrorMessage(error.message);
        },
    });

    const handleChange = (value: string) => {
        setNewMessage(value);
        setErrorMessage(null);
    }

    return (
        <div className="mt-auto mb-5 mx-2">
            <div className="flex items-center">
                <Input
                    className='border-blue-500'
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <Button
                    aria-label="Send message"
                    className={`ml-3 p-2 rounded-full border bg-gray-100 ${errorMessage
                        ? "border-red-500 text-red-500"
                        : "border-blue-500 text-blue-500"}`}
                    onClick={handleSendMessage}
                    disabled={sendMessageMutation.isPending}
                >
                    {sendMessageMutation.isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send size={20} />
                    )}
                </Button>
            </div>

            {errorMessage && (
                <ErrorMessage message={errorMessage} />
            )}
        </div>
    );
};

export { MessageForm };