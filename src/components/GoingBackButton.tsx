import { ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useChatContext } from "../context/ChatContext";
import { QueryClient } from "@tanstack/react-query";

const GoingBackButton = () => {
    const { setSelectedChatId } = useChatContext();
    const queryClient = new QueryClient();

    const handleGoBack = () => {
        setSelectedChatId(null);
        // does not refetch the conversations list..
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
    }

    return (
        <Button
            onClick={() => handleGoBack()}
            className="md:hidden mr-2 p-2 rounded-full border border-black hover:bg-gray-300"
        >
            <ChevronLeft />
        </Button>
    )
}

export { GoingBackButton }