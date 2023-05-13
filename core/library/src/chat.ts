import { GenerateMessageRequest, MessagePrompt } from "./types.js";

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
