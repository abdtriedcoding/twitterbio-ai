import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create a new ratelimiter, that allows 2 requests per 30 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, "30 m"),
});

export const runtime = "edge";

export async function POST(req: Request) {
  if (ratelimit) {
    const ip = req.headers.get("x-real-ip") ?? "local";
    const rl = await ratelimit.limit(ip);

    if (!rl.success) {
      return new Response("Rate limit exceeded", { status: 429 });
    }
  }

  const { prompt } = (await req.json()) as { prompt: string };

  if (!prompt) return new Response("Prompt is required", { status: 400 });

  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

  const stream = GoogleGenerativeAIStream(response);

  return new StreamingTextResponse(stream);
}
