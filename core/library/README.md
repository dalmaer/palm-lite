# palm-lite

![NPM](https://img.shields.io/npm/l/palm-lite) ![npm](https://img.shields.io/npm/v/palm-lite) ![node-current](https://img.shields.io/node/v/palm-lite)

A zero-dependency JavaScript client for the [PaLM API](https://developers.generativeai.google/products/palm).

## Introduction

This library is designed for folks who want the library to mostly get out of the way and only help with the boring bits. If you're looking for a full-featured PaLM API client, check out the [official Node.JS client](https://www.npmjs.com/package/@google-ai/generativelanguage).

The library does two things: it helps you create a valid `Request` object that you can pass to `fetch`, and it provides a couple of convenience builders to create these requests with minimal friction.

It intentionally does not cover the actual fetching of requests or handling of responses. These are left to the user to implement. In my own experience, I found these bits to be highly dependent on the use case and the environment -- so I decided to leave them out, at least for now.

Because the library relies on `fetch`, you can only use it in Node.JS 18 and above are supported. However, because it is zero-dependency, you can use it in the browser as well. Tradeoffs, right?

## Installation

```bash
npm install palm-lite
```

## Usage

As mentioned before, the library has two basic capabilities: constructing `fetch` requests and convenience building.

### Constructing `fetch` requests

The `palm` function is the main entry point to the library. It takes an API key and returns an object with three functions: `message`, `text`, `embedding` -- one for each of the PaLM API endpoints.

```js
import { palm } from "palm-lite";

// Grab the API_KEY somehow. In this example, we're using an environment variable.
const API_KEY = process.env.API_KEY;

// Create a `Request` object.
const request = palm(API_KEY).message({
  prompt: {
    messages: [{ content: "Hello there!" }],
  },
});
// Feed it to `fetch`.
const data = await fetch(request);
// Get the response.
const response = await data.json();
console.log(response.candidates[0].content);
```

The library also exports the necessary types for constructing valid PaLM API objects. The three key request types are `GenerateMessageRequest`, `GenerateTextRequest`, and `EmbedTextRequest`. They come with nice JSDoc comments, so you can use your editor's autocomplete to explore the available options.

Similarly, the library exports the response types for each of the three endpoints: `GenerateMessageResponse`, `GenerateTextResponse`, and `EmbedTextResponse` -- also with nice comments.

These exports should speed up your wandering around the PaLM API documentation.

### Convenience builders

If you're looking to write fewer braces and square brackets, the library also provides a couple of convenience builders. These follow your standard builder pattern. Create an instance, and then chain methods to build up the request.

There are two builders: `Chat` for the `message` endpoint, and `Text` for the `text` endpoint. The constructors for both take an object that lets you specify some common request properties, such as `candidateCount` or `temperature`. Each also contains methods to populate other properties.

The builder's shape is conveniently designed to fit as arguments for the `palm().message` or `palm().text()` functions.

For example:

```js
// Create a builder instance and populate the `temperature` field, then
// populate the `text` field in the prompt, then
// add a safety setting, and finally
// add a stop sequence
const text = new Text({ temperature: 0.5 });
text
  .text("Hello there!")
  .addSafetySetting("HARM_CATEGORY_DANGEROUS", "BLOCK_LOW_AND_ABOVE")
  .addStopSequence("==");

// Feed it to the `text` function
const request = palm(API_KEY).text(text);

// ... Later in code
// Change the prompt
text.text("Hello there! How are you?");
// Feed it to the `text` function again
const request2 = palm(API_KEY).text(text);
```

This concludes the tour of the library. It should be fairly straightforward to use.
If you have any questions or suggestions, or find bugs, please open an issue on Github.

Happy generating!
