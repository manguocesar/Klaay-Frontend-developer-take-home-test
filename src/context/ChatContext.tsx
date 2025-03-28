import { ChatContextType } from '@/types';
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    return (
        <ChatContext.Provider value={{ selectedChatId, setSelectedChatId }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};