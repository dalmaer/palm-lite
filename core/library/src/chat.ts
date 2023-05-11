export const CHAT_MODELS = ["chat-bison-001"];

const ENDPOINT_URL = "https://generativelanguage.googleapis.com/v1beta2/models";

export type GenerateMessageParameters = unknown;
export type PalmApiKey = string;

export const palm = (apiKey: PalmApiKey) => {
  return {
    message: (params: GenerateMessageParameters) => {
      const model = CHAT_MODELS[0];
      const url = `${ENDPOINT_URL}/${model}:generateMessage?key=${apiKey}`;
      return new GenerateMessageRequest(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        params
      );
    },
  };
};

export class GenerateMessageRequest extends Request {
  private params: GenerateMessageParameters;

  constructor(
    url: string,
    init: RequestInit,
    params: GenerateMessageParameters
  ) {
    init.body = JSON.stringify(params);
    super(url, init);
    this.params = params;
  }
}

export type Example = {
  input: { content: string };
  output: { content: string };
};

export type MessagePrompt = {
  examples?: Example[];
  context?: string;
  messages?: { content: string }[];
};

/**
 * A convenience builder for MessageRequest
 */
export class Chat {
  temperature: number;
  candidate_count: number;
  prompt: MessagePrompt = { messages: [] };

  constructor(
    { temperature, candidate_count } = { temperature: 0.25, candidate_count: 1 }
  ) {
    this.temperature = temperature;
    this.candidate_count = candidate_count;
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
