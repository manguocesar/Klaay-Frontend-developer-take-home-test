import { useAuth } from "../../context/AuthContext";
import { createConversation } from "../../lib/useConversation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { conversationSchema } from "../../lib/zod";
import { ErrorMessage } from "../ErrorMessage";

const ConversationForm = () => {
    const queryClient = useQueryClient();
    const [newChatName, setNewChatName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const createConversationMutation = useMutation({
        mutationFn: createConversation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            setNewChatName("");
            setError(null);
        },
        onError: (error: Error) => {
            setError(error.message);
        },
    });

    const handleCreateConversation = async () => {
        try {
            conversationSchema.parse({ name: newChatName });
            await createConversationMutation.mutateAsync({ name: newChatName, token });
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0].message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChatName(e.target.value);
        setError(null);
    };

    return (
        <div className="mt-4">
            <div className="flex flex-col space-y-2">
                <Input
                    placeholder="New Conversation Name..."
                    value={newChatName}
                    onChange={handleChange}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateConversation();
                        }
                    }}
                    className="text-center border-blue-500"
                />
                {error && (
                    <ErrorMessage message={error} />
                )}
                <Button
                    aria-label="Create new conversation"
                    disabled={!newChatName || createConversationMutation.isPending || !token}
                    onClick={handleCreateConversation}
                    className="w-full"
                >
                    {createConversationMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Create New Conversation
                </Button>
            </div>
        </div>
    );
};

export { ConversationForm };