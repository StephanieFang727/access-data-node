import mongoose from "mongoose";
import DataSetModel, { DataSet } from "../model/datasetModel";
import { ErrorModel, SuccessModel } from "../model/resModel";

export const insertData = async (data: DataSet) => {
  try {
    const record = await findByDatasetId(data.datasetId);
    if (record.data) {
      return new ErrorModel(record, "该数据集已存在");
    }
    const newDataSet = new DataSetModel(data);
    const result = await newDataSet.save();
    return new SuccessModel(result);
  } catch (error) {
    return new ErrorModel(null, "数据集插入失败");
  }
};

export const findDatasets = async () => {
  try {
    const result = await DataSetModel.find()
      .select("datasetId datasetName")
      .lean()
      .exec();
    // const nameList = result.map((doc) => doc.datasetId);
    return new SuccessModel(result);
  } catch (error) {
    return new ErrorModel(null, "数据集查询失败");
  }
};

export const findByDatasetId = async (datasetId: string) => {
  try {
    const result = await DataSetModel.findOne({ datasetId });
    console.log(result);
    return result
      ? new SuccessModel(result)
      : new ErrorModel(null, "该数据集不存在");
  } catch (error) {
    return new ErrorModel(null, "数据集查询失败");
  }
};

export const findById = async (fieldId: string) => {
  try {
    const result = await DataSetModel.findOne({ "fields.id": fieldId });
    console.log(result);
    return result
      ? new SuccessModel(result)
      : new ErrorModel(null, "该字段不存在");
  } catch (error) {
    return new ErrorModel(null, "数据集查询失败");
  }
};

export const deleteByDatasetId = async (datasetId: string) => {
  try {
    const result = await DataSetModel.deleteOne({ datasetId });
    console.log(result);
    return new SuccessModel(result);
  } catch (error) {
    return new ErrorModel(null, "数据集删除失败");
  }
};
