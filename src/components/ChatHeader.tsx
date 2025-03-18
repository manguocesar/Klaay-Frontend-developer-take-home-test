import { GoingBackButton } from "./GoingBackButton";

const ChatHeader = ({ chatName }: { chatName: string }) => {
    return (
        <div className="flex items-center m-2 md:m-0">
            <GoingBackButton />
            <h2 className="text-xl font-semibold md:pt-3">{chatName}</h2>
        </div>
    );
}

export { ChatHeader }