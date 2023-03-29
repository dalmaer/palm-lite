#!/usr/bin/env node

import * as dotenv from "dotenv";
import { Chat } from "genai-lib";
import { intro, text, outro, spinner, confirm } from "@clack/prompts";

dotenv.config();
const GCP_API_KEY = process.env.GCP_API_KEY;
const QUIT_VALUE = "<quit>";

const chatCycle = async (chat) => {
  const question = await text({
    message: "Type a message or hit <Enter> to exit",
    defaultValue: QUIT_VALUE,
  });

  if (question === QUIT_VALUE) {
    const shouldQuit = await confirm({
      message: "Are you sure you want to quit?",
    });
    return shouldQuit;
  }

  const s = spinner();

  s.start("Generating message...");

  chat.addMessage(question);
  const response = await chat.generate({
    key: GCP_API_KEY,
    model: "chat-bison-001",
  });

  const reply = response.reply;

  s.stop(reply);
};

intro("Hi there! I am a chatbot based on the PaLM API.");

const chat = new Chat();

while (!(await chatCycle(chat)));

outro("It was great chatting with you!");
