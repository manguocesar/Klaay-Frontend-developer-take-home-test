import { useChatContext } from '../../context/ChatContext';
import { ChatPanel } from '../../components/ChatPanel';
import { ConversationsPannel } from '../../components/ConversationsPannel';

const Conversations = () => {
    const { selectedChatId } = useChatContext();
    return (
        <div className="flex flex-col md:w-10/12">
            <div className="flex flex-col md:flex-row">
                {/* Conversations panel - hidden on mobile when viewing a chat */}
                <div className={`w-screen md:w-6/12 p-4 md:py-0 border-r border-gray-200 h-full md:h-auto ${selectedChatId ? 'hidden md:block' : 'block'}`}>
                    <ConversationsPannel />
                </div>

                {/* Chat panel - hidden on mobile when showing conversations list */}
                <div className={`h-[75vh] md:h-[85vh] md:w-full md:px-4 overflow-scroll ${!selectedChatId ? 'hidden md:block' : 'block'}`}>
                    <ChatPanel />
                </div>
            </div>
        </div>
    );
};

export default Conversations;