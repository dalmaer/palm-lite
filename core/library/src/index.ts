import {
  GenerateMessageRequest,
  GenerateTextRequest,
  EmbedTextRequest,
} from "./types.js";
import { models } from "./models.js";

const ENDPOINT_URL = "https://generativelanguage.googleapis.com/v1beta2/models";

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
export { Chat } from "./chat.js";
export type * from "./chat.js";
