<div align="center">
    <h1 align="center">twitterbio</h1>
    <h5>Generate your next Twitter bio using AI in seconds! 🤖✨</h5>
</div>

<div align="center">
  <a href="https://x.com/abdtriedcoding/status/1784291070269894844">Demo of Build (https://x.com/abdtriedcoding/status/1784291070269894844)</a>
</div>
<br/>

![Thumbnail](/public/thumbnail.png)

Key Features:

- Generate Twitter bio using AI ✨
- Use of Google Gemini AI 🤖
- Use of Vercel AI SDK 🚀
- Rate limiting feature using Upstash ⏳

## How it works

This project uses both [Vercel AI Sdk](https://sdk.vercel.ai) and [Gemini AI](https://ai.google.dev/gemini-api) to generate Twitter bios. It constructs a prompt based on the form and user input, sends it to the Google Gemini API, where vercel ai sdk helps in the streams the response back to the application.

### Prerequisites

**Node version 20.x.x**

## Running Locally

1. Clone the repository.
2. Create an account at [https://ai.google.dev/gemini-api](https://ai.google.dev/gemini-api) and add your API key under `GOOGLE_API_KEY` in your `.env`.
3. Make account at upstash and add your API key under `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your `.env`.
4. Run npm install to install dependencies.
5. Run the application with `npm run dev` and it will be available at `http://localhost:3000`.
