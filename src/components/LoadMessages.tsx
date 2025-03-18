const LoadMessage = ({ toggleShowAllMessages }: { toggleShowAllMessages: () => void }) => {
    return (
        <div
            className="sticky top-0 bg-white py-2 text-center text-blue-500 cursor-pointer"
            onClick={toggleShowAllMessages}
        >
            Load older messages
        </div>
    );
}

export { LoadMessage }