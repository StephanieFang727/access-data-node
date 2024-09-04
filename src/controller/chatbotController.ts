import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import chatbotModel from "../model/chatbotModel";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { StringOutputParser } from "@langchain/core/output_parsers";

const TypeEnum = z.enum([
  "@fangjiefe/line-chart",
  "@fangjiefe/pie-chart",
  "@fangjiefe/bar-chart",
]);

const attributesSchema = z.object({
  title: z.string().optional().describe("图表标题"),
  xAxisTitle: z.string().optional().default("").describe("图表x轴标题"),
  yAxisTitle: z.string().optional().default("").describe("图表y轴标题"),
  useLegend: z.boolean().optional().default(true).describe("是否使用图例"),
  useTooltip: z.boolean().optional().default(true).describe("是否使用提示"),
});

const stylesSchema = z.object({
  titleFontSize: z.number().optional().default(16).describe("标题字体大小"),
});

const cptSchema = z.object({
  // id: z.string().describe("answer to the user's question"),
  type: TypeEnum.describe("图表类型对应的组件库名"),
  props: z.object({
    attributes: attributesSchema,
    styles: stylesSchema,
  }),
});

export const chat = async (question: string) => {
  const parser = StructuredOutputParser.fromZodSchema(cptSchema);
  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      "请回答用户的问题\n{format_instructions}\n{question}"
    ),
    chatbotModel,
    parser,
  ]);
  // console.log(parser.getFormatInstructions());
  const response = await chain.invoke({
    question,
    format_instructions: parser.getFormatInstructions(),
  });

  console.log(response);
  return response;
};
