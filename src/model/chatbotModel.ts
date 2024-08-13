import { ChatOpenAI } from "@langchain/openai";

process.env.OPENAI_API_KEY =
  "sk-xeCZqkKafxDPZK9qZ8MqJEvHA2FTTHgXv2sCp56yhGpmj5LE";

process.env.OPENAI_BASE_URL = "https://api.chatanywhere.tech";

const chatbotModel = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export default chatbotModel;
