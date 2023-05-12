import generativelanguage from "./types.js";

export const CHAT_MODELS = ["chat-bison-001"];

const ENDPOINT_URL = "https://generativelanguage.googleapis.com/v1beta2/models";

export interface GenerateMessageRequest
  extends generativelanguage.IGenerateMessageRequest {}

export type PalmApiKey = string;

export const palm = (apiKey: PalmApiKey) => {
  return {
    message: (request: GenerateMessageRequest) => {
      const model = CHAT_MODELS[0];
      const url = `${ENDPOINT_URL}/${model}:generateMessage?key=${apiKey}`;
      return new Request(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
    },
  };
};

export interface Example extends generativelanguage.IExample {}

export interface MessagePrompt extends generativelanguage.IMessagePrompt {}

/**
 * A convenience builder for MessageRequest
 */
export class Chat implements GenerateMessageRequest {
  temperature: number;
  candidateCount: number;
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
