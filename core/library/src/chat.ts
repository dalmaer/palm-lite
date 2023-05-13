import generativelanguage from "./types.js";
import { models } from "./models.js";

const ENDPOINT_URL = "https://generativelanguage.googleapis.com/v1beta2/models";

export interface GenerateMessageRequest
  extends generativelanguage.GenerateMessageRequest {}

export interface GenerateTextRequest
  extends generativelanguage.GenerateTextRequest {}

export interface EmbedTextRequest extends generativelanguage.EmbedTextRequest {}

export interface Example extends generativelanguage.Example {}

export interface MessagePrompt extends generativelanguage.MessagePrompt {}

export type PalmApiKey = string;

type PaLMRequest =
  | GenerateMessageRequest
  | GenerateTextRequest
  | EmbedTextRequest;

class PaLM {
  private key: PalmApiKey;
  constructor(API_KEY: PalmApiKey) {
    this.key = API_KEY;
  }

  private prepareRequest(method: string, request: PaLMRequest, model: string) {
    const url = `${ENDPOINT_URL}/${model}:${method}?key=${this.key}`;
    return new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  }

  message(
    request: GenerateMessageRequest,
    model: string = models.generateMessage[0].name
  ): Request {
    return this.prepareRequest("generateMessage", request, model);
  }

  text(
    request: GenerateTextRequest,
    model: string = models.generateText[0].name
  ): Request {
    return this.prepareRequest("generateText", request, model);
  }

  embedding(
    request: EmbedTextRequest,
    model: string = models.embedText[0].name
  ): Request {
    return this.prepareRequest("embedText", request, model);
  }
}

export const palm = (apiKey: PalmApiKey): PaLM => new PaLM(apiKey);

/**
 * A convenience builder for chat-like requests.
 *
 * Implements `GenerateMessageRequest` interface.
 *
 * Example:
 *
 * ```typescript
 * const chat = new Chat();
 * chat.addMessage("Hello there!");
 * const data = await fetch(palm(API_KEY).message(chat));
 * const response = await data.json();
 * ```
 *
 */
export class Chat implements GenerateMessageRequest {
  temperature?: number;
  candidateCount?: number;
  topP?: number;
  topK?: number;
  prompt: MessagePrompt = { messages: [] };

  constructor(
    { temperature, candidateCount } = {
      temperature: 0.25,
      candidateCount: 1,
    }
  ) {
    this.temperature = temperature;
    this.candidateCount = candidateCount;
  }

  context(context: string) {
    this.prompt.context = context;
    return this;
  }

  addExample({ input, output }: { input: string; output: string }) {
    if (!this.prompt.examples) this.prompt.examples = [];
    this.prompt.examples.push({
      input: { content: input },
      output: { content: output },
    });
    return this;
  }

  addMessage(message: string) {
    this.prompt?.messages?.push({ content: message });
    return this;
  }
}
