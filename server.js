const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Add this middleware to parse JSON request bodies
app.use(express.json());

const data = {
  conversations: [
    {
      id: "d259d0be-a4cd-41f8-a19b-e333eab1fe21",
      name: "Conversation #1",
      author: "c89ee220-37fc-4781-ae07-24fcaf91281a",
      messages: [
        {
          id: "12f22418-4b56-44ad-9404-cf9231aad3d4",
          text: "Hello, World!",
          author: "c89ee220-37fc-4781-ae07-24fcaf91281a"
        }
      ]
    },
    {
      id: "c6b3b2c2-2f7f-4d3e-8b0e-1b5d0b7b3f8d",
      name: "Conversation #2",
      author: "f5a2d4e7-3b8f-4c7d-8e7e-3f1b4f7e8f7d",
      messages: [
        {
          id: "d0d8f7e8-7b3f-4b0e-8d3e-2c2f7f6b3b2c",
          text: "Hi, there!",
          author: "AI",
        }
      ]
    }
  ],
  users: [
    {
      id: "c89ee220-37fc-4781-ae07-24fcaf91281a",
      username: "user1",
      password: "password1",
      email: "user1@example.com"
    },
    {
      id: "f5a2d4e7-3b8f-4c7d-8e7e-3f1b4f7e8f7d",
      username: "user2",
      password: "password2",
      email: "user2@example.com"
    }
  ]
}

const firstMessage = {
  id: "12f22418-4b56-44ad-9404-cf9231aad3d4",
  text: "Hello, how can I help you?",
  author: "AI",
}

function authorize(req, res) {
  const { authorization } = req.headers;
  const token = String(authorization);
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  return data.users.find(user => user.id === token);
}

function validateRequest(req, res) {
  if (String(req.headers["content-type"]) != "application/json") {
    return res.status(415).send({ message: `Unsupported Content-Type header: ${req.headers["content-type"]}` });
  }

  if (!req.accepts("application/json")) {
    return res.status(415).send({ message: `Unsupported Accept header: ${req.headers["accept"]}` });
  }
}

function generateAIResponse(conversation) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage.author === "AI") return;

  const aiMessage = {
    id: crypto.randomUUID(),
    text: `AI: I'm sorry, I don't understand. Can you please rephrase that?`,
    author: "AI",
  }
  conversation.messages.push(aiMessage);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.post("/authenticate", (req, res) => {
  try {
    validateRequest(req, res);
    const { username, password } = req.body;
    const user = data.users.find(user => user.username === username && user.password === password);
    if (!user) return res.status(401).send({ message: "Unauthorized" });

    res.send({ token: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/conversations", (req, res) => {
  try {
    validateRequest(req, res);
    const user = authorize(req, res);
    const conversations = data.conversations.filter(conversation => conversation.author === user.id);
    res.send({ conversations });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/conversations/:id", (req, res) => {
  try {
    validateRequest(req, res);
    const user = authorize(req, res);
    const conversation = data.conversations.find(conversation => conversation.id === req.params.id);
    if (!conversation) return res.status(404).send({ message: "Not Found" });
    if (conversation.author !== user.id) return res.status(403).send({ message: "Forbidden" });

    res.send({ conversation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/conversations", (req, res) => {
  try {
    validateRequest(req, res);
    const author = authorize(req, res);
    const { name } = req.body;
    const conversation = {
      id: crypto.randomUUID(),
      name,
      author: author.id,
      messages: [firstMessage],
    }
    data.conversations.push(conversation);
    res.send({ conversation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/conversations/:id", (req, res) => {
  try {
    validateRequest(req, res);
    const author = authorize(req, res);
    const conversation = data.conversations.find(conversation => conversation.id === req.params.id);
    if (!conversation) return res.status(404).send({ message: "Not Found" });
    if (conversation.author !== author.id) return res.status(403).send({ message: "Forbidden" });

    const { text } = req.body;
    const message = {
      id: crypto.randomUUID(),
      text,
      author: author.id,
    }
    conversation.messages.push(message);
    res.send({ message });
    delay(2500).then(() => generateAIResponse(conversation));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Serve openapi.json file
app.get("/openapi.json", (req, res) => {
  res.sendFile(__dirname + "/openapi.json");
});

// Serve doc.html file
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/doc.html");
});

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
