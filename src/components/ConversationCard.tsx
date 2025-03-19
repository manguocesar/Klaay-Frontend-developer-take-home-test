import { useChatContext } from "../context/ChatContext";
import { Chat } from "../types";

const twoLastMessages = 2;

const ConversationCard = ({ chat }: { chat: Chat }) => {
    const { selectedChatId, setSelectedChatId } = useChatContext();
    const handleSelectConversation = (id: string) => {
        setSelectedChatId(id);
    };

    return (
        <div
            key={chat.id}
            onClick={() => handleSelectConversation(chat.id)}
            className={`bg-white shadow-md rounded-lg p-4 mb-3 hover:bg-gray-50 hover:shadow-lg cursor-pointer
                ${selectedChatId === chat.id && 'border-2 border-blue-500'}`}
        >
            <h3 className="text-base md:text-lg font-semibold">{chat.attributes.name}</h3>
            <div className="mt-2">
                {chat.attributes.messages.slice(0, twoLastMessages).map((message) => (
                    <div key={message.id} className="border-t border-gray-200 pt-2 ">
                        <p className="text-gray-800">{message.text}</p>
                    </div>
                ))}
                {chat.attributes.messages.length > 4 && (
                    <div className="pt-2 text-center">
                        <p className="text-gray-800">{chat.attributes.messages.length - twoLastMessages} more messages</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ConversationCard };