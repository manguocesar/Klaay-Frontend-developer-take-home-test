import { Messages } from "../types";

const MessageBubble = ({ message, chatAuthor }: { message: Messages; chatAuthor: string }) => {
    const getMessageStyle = (isCurrentUser: boolean) => ({
        container: isCurrentUser ? "justify-end" : "justify-start",
        bubble: isCurrentUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-200 text-gray-800 rounded-tl-none",
    });

    const isCurrentUser = chatAuthor === message.author;
    const styles = getMessageStyle(isCurrentUser);

    return (
        <div key={message.id} className={`flex my-2 ${styles.container}`}>
            <p className={`rounded-lg p-3 max-w-[70%] ${styles.bubble}`}>{message.text}</p>
        </div>
    );
};

export { MessageBubble };