import { GenerateTextRequest, SafetySetting, TextPrompt } from "./types.js";

const safetySetting: SafetySetting = {
  category: "HARM_CATEGORY_UNSPECIFIED",
  threshold: "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
};

export type SafetyCategory = typeof safetySetting.category;
export type SafetyThreshold = typeof safetySetting.threshold;

export interface PartialGenerateTextRequest
  extends Omit<GenerateTextRequest, "prompt"> {
  prompt?: TextPrompt;
}

export class Text implements GenerateTextRequest {
  candidateCount?: number;
  maxOutputTokens?: number;
  prompt: TextPrompt = { text: "" };
  safetySettings?: SafetySetting[];
  stopSequences?: string[];
  temperature?: number;
  topK?: number;
  topP?: number;

  constructor(request?: PartialGenerateTextRequest) {
    Object.assign(this, request);
  }

  text(text: string) {
    this.prompt.text = text;
    return this;
  }

  addSafetySetting(category: SafetyCategory, threshold: SafetyThreshold) {
    if (!this.safetySettings) this.safetySettings = [];
    this.safetySettings.push({ category, threshold });
    return this;
  }

  addStopSequence(sequence: string) {
    if (!this.stopSequences) this.stopSequences = [];
    this.stopSequences.push(sequence);
    return this;
  }
}
