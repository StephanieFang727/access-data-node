import mongoose from "mongoose";
import DataSetModel, { DataSet } from "../model/datasetModel";

export const insertData = async () => {
  const data = {
    datasetId: "datasetId_tgrchmay5kh",
    datasetName: "测试数据集1",
    description: "不同渠道点击率变化趋势",
    fields: [
      {
        id: "2jdudh",
        fieldName: "点击率",
        fieldType: "STRING",
        expression: "click_rate",
        category: "MEASURE",
      },
      {
        id: "swmz26",
        fieldName: "渠道",
        fieldType: "STRING",
        expression: "channel",
        category: "DIMENSION",
      },
      {
        id: "zbld2c",
        fieldName: "日期",
        fieldType: "STRING",
        expression: "date",
        category: "DIMENSION",
      },
    ],
  };
  const newDataSet = new DataSetModel(data);
  const result = await newDataSet.save();
  return result;
};

export const findByDatasetId = async (datasetId: string) => {
  const result = await DataSetModel.findOne({ datasetId });
  console.log(result);
  return result;
};

export const findById = async (fieldId: string) => {
  const result = await DataSetModel.findOne({ "fields.id": fieldId });
  console.log(result);
  return result;
};
