export const CHAT_MODELS = ["chat-bison-001"];

const ENDPOINT_URL = "https://generativelanguage.googleapis.com/v1beta1/models";

export class ChatRequest {
  temperature;
  candidate_count;
  prompt = { messages: [] };

  constructor(
    { temperature, candidate_count } = { temperature: 0.25, candidate_count: 1 }
  ) {
    this.temperature = temperature;
    this.candidate_count = candidate_count;
  }

  context(context) {
    this.prompt.context = context;
    return this;
  }

  addExample({ input, output }) {
    if (!this.prompt.examples) this.prompt.examples = [];
    this.prompt.examples.push({
      input: { content: input },
      output: { content: output },
    });
    return this;
  }

  addMessage(message) {
    this.prompt.messages.push({ content: message });
    return this;
  }
}

export class Chat {
  model;
  key;

  constructor({ model, key }) {
    if (!CHAT_MODELS.includes(model)) {
      throw new Error("Unknown model.");
    }
    this.model = model;
    this.key = key;
  }

  async generate(request) {
    const response = await fetch(
      `${ENDPOINT_URL}/${this.model}:generateMessage?key=${this.key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    return response.json();
  }
}
