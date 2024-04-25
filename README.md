# twitterbio

This project generates Twitter (X) bios for you using AI.

[![Twitter Bio Generator](https://files.edgestore.dev/j26azsoyqh7n72m2/myPublicImages/_public/8ee1e5fe-ee49-4d39-9270-9db979f6887a.png)](https://twitterbio.vercel.app)

## How it works

This project uses both [Vercel AI Sdk](https://sdk.vercel.ai) and [Claude](https://claude.ai) with streaming to generate a Twitter bio. It constructs a prompt based on the form and user input, sends it either to the claude API, where vercel ai sdk helps in the streams the response back to the application.

## Running Locally

1. Clone the repository.
2. Create an account at [console.anthropic.com](https://console.anthropic.com/settings/keys) and add your API key under `ANTHROPIC_API_KEY` in your `.env`.
3. Make account at upstash and add your API key under `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your `.env`.
4. Run npm install to install dependencies.
5. Run the application with `npm run dev` and it will be available at `http://localhost:3000`.
