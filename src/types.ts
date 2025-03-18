export type Chat = {
  id: string;
  attributes: {
    name: string;
    author: string;
    messages: Messages[];
  };
};

export type AuthContextType = {
  token: string | null;
  addAuthToken: (token: string) => void;
  removeAuthToken: () => void;
};

export type ChatContextType = {
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
};

export type Messages = {
  id: string;
  text: string;
  author: string;
};

export type Inputs = {
  username: string;
  password: string;
};

export type LoginResponse = {
  meta: {
    token: string;
  };
};
