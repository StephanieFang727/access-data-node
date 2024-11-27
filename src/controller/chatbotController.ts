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

const DatasetNameEnum = z.enum(["用户行为数据表", "资源成本收益表"]);
const DataSetIdEnum = z.enum([
  "datasetId_X8dsi13jDqaO",
  "datasetId_I0BypRSVX7us",
]);

const attributesSchema = z.object({
  title: z.string().optional().describe("图表标题"),
  xAxisTitle: z.string().optional().default("").describe("图表x轴标题"),
  yAxisTitle: z.string().optional().default("").describe("图表y轴标题"),
});

const stylesSchema = z.object({
  useLegend: z.boolean().optional().default(true).describe("是否使用图例"),
  useTooltip: z.boolean().optional().default(true).describe("是否使用提示"),
});

const datasetSchema = z.object({
  datasetId: DataSetIdEnum.describe("数据集id").default(
    "datasetId_X8dsi13jDqaO"
  ),
  datasetName: DatasetNameEnum.describe("数据集名称").default("用户行为数据表"),
});

const cptSchema = z.object({
  // id: z.string().describe("answer to the user's question"),
  type: TypeEnum.describe("图表类型对应的组件库名"),
  props: z.object({
    attributes: attributesSchema,
    styles: stylesSchema,
    dataSet: datasetSchema,
  }),
});

export const chat = async (question: string) => {
  const parser = StructuredOutputParser.fromZodSchema(cptSchema);
  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      `请回答用户的问题，并返回结构化的 JSON 数据。
       如果用户提问与图表创建无关，请回答"抱歉，我只能回答图表创建相关问题"，且不返回JSON数据。
       先生成解释性文本，然后生成符合以下格式的 JSON 数据：
       {format_instructions}
       问题: {question}`
    ),
    chatbotModel,
    //parser,
    async (response) => {
      console.log("res", question, response);
      // 将响应分为文字部分和JSON部分
      const [explanation, jsonString] =
        response.content.split(/\n(?=```json)/s);

      // 验证JSON部分是否有效
      let parsedJson = null;
      if (jsonString) {
        parsedJson = await parser.parse(jsonString);
      }

      return {
        explanation: explanation.trim(),
        data: parsedJson,
      };
    },
  ]);
  // console.log(parser.getFormatInstructions());
  const response = await chain.invoke({
    question,
    format_instructions: parser.getFormatInstructions(),
  });

  console.log(response);
  return response;
};
