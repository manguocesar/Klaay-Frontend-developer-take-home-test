import { API_URL } from "../constants";

export const getConversations = async (token: string) => {
  const response = await fetch(`${API_URL}/conversations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch conversations");
  }

  const { data } = await response.json();
  return data;
};

export const createConversation = async (attributes: {
  name: string;
  token: string | null;
}) => {
  const response = await fetch(`${API_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: attributes.token || "",
    },
    body: JSON.stringify({
      data: {
        type: "create conversation",
        attributes: {
          name: attributes.name,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create conversation");
  }

  return response.json();
};
