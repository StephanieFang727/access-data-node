import { Context } from "koa";
import chatbotModel from "../model/chatbotModel";
import { z } from "zod";

export const chat = async (question: string) => {
  const joke = z.object({
    setup: z.string().describe("The setup of the joke"),
    punchline: z.string().describe("The punchline to the joke"),
    rating: z
      .number()
      .optional()
      .describe("How funny the joke is, from 1 to 10"),
  });

  const structuredLlm = chatbotModel.withStructuredOutput(joke);
  console.log("chatbotModel", await chatbotModel.invoke(question));
  return await structuredLlm.invoke(question);
};
