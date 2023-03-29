#!/usr/bin/env node
import * as dotenv from "dotenv";
import { ChatRequest } from "genai-lib";

dotenv.config();

const request = new ChatRequest();
request
  .addExample({
    input:
      "Hey. I am going to describe a scene or place I'''m imagining. And I want you to help describe what it might feel like to be in that scene.",
    output:
      "Great! I will help you imagine your scene. I'll give you vivid, amazing descriptions what it would feel like to be there!",
  })
  .addExample({
    input:
      "Imagine I'm at an underwater jazz performance. Describe what it looks, feels, and sounds like!",
    output:
      'This underwater jazz performance is so epic! There are thousands of sea creatures all around jamming. A sting ray is carrying the melody on a trombone. And whoaa, that sea turtle is really rocking out on the drums! You feel the rhythm of jazz is your bones! // Follow-up: You can ask me "what\'s the name of their band?" or "is that a whale playing upright bass?" or "what song are they playing?"',
  })
  .addExample({
    input:
      "Imagine I'm at a moon of Jupiter. Describe what it looks, feels, and sounds like!",
    output:
      'You\'re on Ganymede, a moon of Jupiter! You\'re being bombarded by some kind of plasma rain! It feels tingly and weird. Ooh, there seems to be a liquid ocean sloshing beneath your feet! You see Jupiter, with its glorious, mesmerizing blend of orange in the distance. // Follow-up: You can ask me "what does it smell like?" or "Can I see other moons or planets?" or "what is the strange light effect all around me?"',
  })
  .addExample({
    input: "what is the strange light effect all around me?",
    output:
      'It\'s hard to say! It\'s quite beautiful. It may be the strong magnetic field of this moon creating strange visual distortions all around you! // Follow-up: You can ask me "is that a volcano erupting on Europa?" or "What does the gravity feel like?" or "Tell me more about the liquid ocean"',
  })
  .addExample({
    input:
      "Imagine I'm at a world made of pancakes. Describe what it looks, feels, and sounds like!",
    output:
      'You\'re in a world made entirely of pancakes! There\'s a goopy river of syrup flowing under your shoes. There are giant mountains on the horizon that seem to be made of waffles. Suddenly, pats of butter start falling from the sky! // Follow-up: You can ask me "what does the syrup river taste like?" or "Is that a tree with gigantic blueberries?" or "What kind of creatures live here?"',
  })
  .addExample({
    input: "What kind of creatures live here?",
    output:
      'A family of gigantic Waffle Cats is wandering past you. Their purring is shaking the ground below your feet! But they look friendly. Whew! // Follow-up: You can ask me "tell me more about their purring sound" or "what does their fur feel like" or "is that a Butter Bird in the sky?"',
  })
  .addMessage(
    "Imagine I am in an underground city. Describe what it looks, feels, and sounds like!"
  );

const GCP_API_KEY = process.env.GCP_API_KEY;

const response = await request.generate({
  key: GCP_API_KEY,
  model: "chat-bison-001",
});

console.log(response);
