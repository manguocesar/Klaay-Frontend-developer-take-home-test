import { Chat, Messages } from "@/types";
import { MessageBubble } from "../MessageBubble";
import { LoadMessage } from "../LoadMessages";
import { useState } from "react";

const MessagesContainer = ({ selectedChat }: { selectedChat: Chat }) => {
    const [showAllMessages, setShowAllMessages] = useState(false);

    const toggleShowAllMessages = () => {
        setShowAllMessages((prev) => !prev);
    };

    // to show last messages first
    const messagesToShow = showAllMessages
        ? selectedChat.attributes.messages
        : selectedChat.attributes.messages.slice(-10);

    return (
        <div className="flex-grow overflow-y-auto mb-4 px-2 h-full">
            {!showAllMessages && selectedChat.attributes.messages.length > 10 && (
                <LoadMessage toggleShowAllMessages={toggleShowAllMessages} />
            )}
            {messagesToShow.map((message: Messages) => {
                return (
                    <MessageBubble key={message.id} message={message} chatAuthor={selectedChat.attributes.author} />
                );
            })}
        </div>
    )
}

export { MessagesContainer }