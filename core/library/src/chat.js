export const CHAT_MODELS = ["chat-bison-001"];

const ENDPOINT_URL = "https://generativelanguage.googleapis.com/v1beta1/models";

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

  async generate(prompt) {
    const response = await fetch(
      `${ENDPOINT_URL}/${this.model}:generateMessage?key=${this.key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      }
    );

    return response.json();
  }
}
