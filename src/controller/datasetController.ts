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
        name: "点击率",
        fieldType: "STRING",
        expression: "click_rate",
        category: "MEASURE",
      },
      {
        id: "swmz26",
        name: "渠道",
        fieldType: "STRING",
        expression: "channel",
        category: "DIMENSION",
      },
      {
        id: "zbld2c",
        name: "日期",
        fieldType: "DATE",
        expression: "date",
        category: "DIMENSION",
      },
      {
        id: "bow3yn",
        name: "看播率",
        fieldType: "STRING",
        expression: "watch_rate",
        category: "MEASURE",
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

export const deleteByDatasetId = async (datasetId: string) => {
  const result = await DataSetModel.deleteOne({ datasetId });
  console.log(result);
  return result;
};
