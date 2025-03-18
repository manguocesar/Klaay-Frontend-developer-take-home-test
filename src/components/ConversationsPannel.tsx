import { Chat } from "../types";
import { ConversationCard } from "./ConversationCard";
import { ConversationForm } from "./ConversationForm";
import { Loader2 } from "lucide-react";
import { getConversations } from "../lib/useConversation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const ConversationsPannel = () => {
    const { token } = useAuth();
    const {
        data: conversations,
        error: conversationsError,
        isLoading: conversationsLoading
    } = useQuery<Chat[]>({
        queryKey: ['conversations'],
        queryFn: () => getConversations(token || ''),
    });

    if (conversationsLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (conversationsError) {
        return <div className="text-red-500 text-center">Error loading conversations</div>;
    }

    return (
        <div className="flex flex-col md:p-3 md:bg-gray-200 md:rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your conversations:</h2>
            <div className="h-[55vh] md:h-[65vh]  overflow-y-scroll">
                {conversations?.map((chat: Chat) => (
                    <ConversationCard chat={chat} key={chat.id} />
                ))}
            </div>
            <ConversationForm />
        </div>
    );
};

export { ConversationsPannel }