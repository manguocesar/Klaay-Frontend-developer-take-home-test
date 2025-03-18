# Klaay Frontend developer take-home test

The task is to use this code to create a chat application that uses the provided API.

The goal is to have a friendly UX and UI experience when creating new conversations and writing and reading messages.

We will review your code collaboratively during the technical interview. 
Please send us your code and instructions on running it at least the day before your interview.

## Requirements

- Use the provided API to fetch and send messages.
- Display messages in a chat-like interface.
- Each user can have multiple conversations.
- Each user can only see their conversations.
- Your code must be tested.

## Delivery

- Deliver your code to us at least one day before the interview.
- Note how many hours you have spent on the test.

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the automated tests:

```bash
npm run test
```

And access it on http://localhost:5173 and the API on http://localhost:3001/docs

## Instructions

### LOGIN
Two credentials are hardcoded in the backend:
1. username: "user1" && password: "password1"
2. username: "user2" && password: "password2"

- Users can log in with both credentials through the login form
- If credentials are incorrect, error messages show up

### FUNCTIONALITIES
- To test the UX & responsiveness, using mobile & desktop screens is needed
- From both the mobile & desktop views, users can review their conversations & chats with other users
- From both the mobile & desktop views, users can create new conversations & send new messages
- An automatied answer is generated & fetched every 3 seconds after a message is sent out by the user

### LOGOUT
- Once several conversations have been created & several messages have been sent out on mobile & desktop views, the user can log out with the top left button to be redirected to the login page
