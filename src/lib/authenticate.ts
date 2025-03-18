import { API_URL } from "../constants";
import { LoginResponse } from "../types";
import { LoginFormValues } from "./zod";

const authenticate = async (
  attributes: LoginFormValues
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "login",
        attributes: {
          username: attributes.username,
          password: attributes.password,
        },
      },
    }),
  });

  if (!response.ok) {
    if (response.statusText === "Unauthorized") {
      throw new Error("Invalid username or password");
    }
    throw new Error("Login failed");
  }

  return response.json();
};

export { authenticate };
