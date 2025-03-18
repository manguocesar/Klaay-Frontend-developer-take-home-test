import { API_URL } from "../constants";

const getMessage = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/conversations/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch chat");
  }

  const { data } = await response.json();
  return data;
};

const createMessage = async ({
  text,
  selectedChatId,
  token,
}: {
  text: string;
  selectedChatId: string;
  token: string;
}) => {
  if (!selectedChatId) throw new Error("No conversation selected");

  const response = await fetch(`${API_URL}/conversations/${selectedChatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: token || "",
    },
    body: JSON.stringify({
      data: {
        type: "message",
        attributes: {
          text,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error sending message");
  }
  return response.json();
};

export { getMessage, createMessage };
