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

const prepareRequest = (
  key: PalmApiKey,
  method: string,
  request: PaLMRequest,
  model: string
): Request => {
  const url = `${ENDPOINT_URL}/${model}:${method}?key=${key}`;
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
};

class PaLM {
  private key: PalmApiKey;
  constructor(API_KEY: PalmApiKey) {
    this.key = API_KEY;
  }

  message(
    request: GenerateMessageRequest,
    model: string = models.generateMessage[0].name
  ): Request {
    return prepareRequest(this.key, "generateMessage", request, model);
  }

  text(
    request: GenerateTextRequest,
    model: string = models.generateText[0].name
  ): Request {
    return prepareRequest(this.key, "generateText", request, model);
  }

  embedding(
    request: EmbedTextRequest,
    model: string = models.embedText[0].name
  ): Request {
    return prepareRequest(this.key, "embedText", request, model);
  }
}

export const palm = (apiKey: PalmApiKey): PaLM => new PaLM(apiKey);
export * from "./chat.js";
