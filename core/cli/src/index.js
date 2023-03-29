#!/usr/bin/env node

import * as dotenv from "dotenv";
import { ChatRequest } from "genai-lib";
import { intro, text, outro, spinner } from "@clack/prompts";

dotenv.config();
const GCP_API_KEY = process.env.GCP_API_KEY;

intro("Hi there! I am a simple chatbot based on PaLM model.");

const question = await text({
  message: "What would you like to chat about?",
});

const s = spinner();

s.start("Generating message...");

const chat = new ChatRequest();
chat.addMessage(question);
const response = await chat.generate({
  key: GCP_API_KEY,
  model: "chat-bison-001",
});

s.stop(response.candidates[0].content);

outro("It was great chatting with you!");
