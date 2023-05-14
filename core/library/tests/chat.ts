import test from "ava";

import { Chat } from "../src/chat.js";

test("Constructor argument pass-through works as advertised", (t) => {
  {
    const chat = new Chat({ temperature: 0.5 });
    t.is(chat.temperature, 0.5);
  }
  {
    const chat = new Chat();
    t.is(chat.temperature, undefined);
  }
  {
    const chat = new Chat({});
    t.is(chat.temperature, undefined);
  }
});
