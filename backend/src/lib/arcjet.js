import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

// Base rules for all Arcjet instances
const baseRules = [
  shield({ mode: "LIVE" }),
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE"],
  }),
];

// General API (100 req / 60 sec)
const aj = arcjet({
  key: ENV.ARCJET_API_KEY,
  rules: [
    ...baseRules,
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

// auth endpoints (5 req / 10 mins)
export const signUpAj = arcjet({
  key: ENV.ARCJET_API_KEY,
  rules: [
    ...baseRules,
    slidingWindow({
      mode: "LIVE",
      max: 5,
      interval: 600,
    }),
  ],
});

// Login (10 req / 15 mins)
export const loginAj = arcjet({
  key: ENV.ARCJET_API_KEY,
  rules: [
    ...baseRules,
    slidingWindow({
      mode: "LIVE",
      max: 10,
      interval: 900,
    }),
  ],
});

// Sensitive Email Operations (5 req / 1 hour)
// For forgot-password, resend-verification, verify-email
export const emailAj = arcjet({
  key: ENV.ARCJET_API_KEY,
  rules: [
    ...baseRules,
    slidingWindow({
      mode: "LIVE",
      max: 5,
      interval: 3600,
    }),
  ],
});

export const pusherAj = arcjet({
  key: ENV.ARCJET_API_KEY,
  rules: [
    ...baseRules,
    // Less aggressive rate limit for Pusher
    slidingWindow({
      mode: "LIVE",
      max: 200,
      interval: 60,
    }),
  ],
});

// User Search (20 req / 1 hour) to prevent email scraping
export const searchAj = arcjet({
  key: ENV.ARCJET_API_KEY,
  rules: [
    ...baseRules,
    slidingWindow({
      mode: "LIVE",
      max: 20,
      interval: 3600,
    }),
  ],
});

export default aj;