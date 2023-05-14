import test from "ava";

import { palm } from "../src/index.js";

test("palm() produces a PaLM instance", (t) => {
  const instance = palm("API_KEY");
  t.is(typeof instance.message, "function");
  t.is(typeof instance.text, "function");
  t.is(typeof instance.embedding, "function");
});

test("palm().message() produces a valid Request", async (t) => {
  const request = palm("API_KEY").message({
    prompt: {
      messages: [
        {
          content: "Hello there!",
        },
      ],
    },
  });
  t.true(request instanceof Request);
  t.is(request.method, "POST");
  t.is(request.headers.get("Content-Type"), "application/json");
  t.is(
    request.url,
    "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=API_KEY"
  );
  const body = await request.json();
  t.deepEqual(body, {
    prompt: {
      messages: [
        {
          content: "Hello there!",
        },
      ],
    },
  });
});

test("palm().text() produces a valid Request", async (t) => {
  const request = palm("API_KEY").text({ prompt: { text: "" } });
  t.true(request instanceof Request);
  t.is(request.method, "POST");
  t.is(request.headers.get("Content-Type"), "application/json");
  t.is(
    request.url,
    "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=API_KEY"
  );
  const body = await request.json();
  t.deepEqual(body, { prompt: { text: "" } });
});

test("palm().embedding() produces a valid Request", async (t) => {
  const request = palm("API_KEY").embedding({ text: "Hello there!" });
  t.true(request instanceof Request);
  t.is(request.method, "POST");
  t.is(request.headers.get("Content-Type"), "application/json");
  t.is(
    request.url,
    "https://generativelanguage.googleapis.com/v1beta2/models/embedding-gecko-001:embedText?key=API_KEY"
  );
  const body = await request.json();
  t.deepEqual(body, { text: "Hello there!" });
});
