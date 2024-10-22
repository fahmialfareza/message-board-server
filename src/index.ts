import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import messages from "./db/messages";

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "full stack message board! 🎉",
  });
});

app.get("/messages", async (req: Request, res: Response) => {
  try {
    const allMessages = await messages.getAll();
    res.json(allMessages);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch messages" });
  }
});

app.post("/messages", async (req: Request, res: Response) => {
  try {
    const newMessage = await messages.create(req.body);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Server setup
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
