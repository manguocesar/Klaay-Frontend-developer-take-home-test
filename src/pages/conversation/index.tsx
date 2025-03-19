import { useChatContext } from '../../context/ChatContext';
import { ChatPanel } from '../../components/ChatPanel';
import { ConversationsPannel } from '../../components/ConversationsPannel';
import { memo, useMemo } from 'react';
import clsx from 'clsx';

const MemoizedChatPanel = memo(ChatPanel);
const MemoizedConversationsPannel = memo(ConversationsPannel);

const Conversations = () => {
    const { selectedChatId } = useChatContext();

    const conversationsPanelClassNames = useMemo(() => {
        return clsx(
            'w-screen p-4 md:py-0 border-r border-gray-200 h-full md:h-auto',
            {
                'hidden md:block': selectedChatId,  // Hide on desktop when chat is selected
                'block': !selectedChatId,           // Show on mobile and desktop when no chat is selected
            }
        );
    }, [selectedChatId]);

    const chatPanelClassNames = useMemo(() => {
        return clsx(
            'overflow-scroll md:px-4',
            {
                'hidden md:block': !selectedChatId,  // Hide on desktop when no chat is selected
                'block h-[75vh] md:h-[85vh]': selectedChatId,  // Show on mobile and desktop when a chat is selected
            }
        );
    }, [selectedChatId]);

    return (
        <div className="flex flex-col md:w-10/12">
            <div className="flex flex-col md:flex-row">
                {/* Conversations panel - hidden on mobile when viewing a chat */}
                <div className={conversationsPanelClassNames}>
                    <MemoizedConversationsPannel />
                </div>

                {/* Chat panel - hidden on mobile when showing conversations list */}
                <div className={chatPanelClassNames}>
                    <MemoizedChatPanel />
                </div>
            </div>
        </div>
    );
};

export default Conversations;
