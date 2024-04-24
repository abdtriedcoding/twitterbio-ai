import { Redis } from "@upstash/redis";
import Anthropic from "@anthropic-ai/sdk";
import { Ratelimit } from "@upstash/ratelimit";
import { AnthropicStream, StreamingTextResponse } from "ai";

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create a new ratelimiter, that allows 2 requests per 30 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, "30 m"),
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  if (ratelimit) {
    const ip = req.headers.get("x-real-ip") ?? "local";
    const rl = await ratelimit.limit(ip);

    if (!rl.success) {
      return new Response("Rate limit exceeded", { status: 429 });
    }
  }

  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  if (!prompt) return new Response("Prompt is required", { status: 400 });

  // Ask Claude for a streaming chat completion given the prompt
  const response = await anthropic.messages.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "▲",
          },
        ],
      },
    ],
    model: "claude-3-haiku-20240307",
    stream: true,
    max_tokens: 300,
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
