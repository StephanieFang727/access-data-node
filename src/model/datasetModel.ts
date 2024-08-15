import mongoose, { Document, Schema } from "mongoose";

enum FieldCategory {
  D = "DIMENSION",
  M = "MEASURE",
}

enum FieldType {
  N = "NUMBER",
  S = "STRING",
  D = "DATE",
  T = "TIME",
  DT = "DATETIME",
  B = "BOOLEAN",
}

interface Field {
  id: string;
  name: string;
  fieldType: FieldType;
  expression: string;
  category: FieldCategory;
}

export interface DataSet extends Document {
  datasetId: string;
  datasetName: string;
  description?: string;
  fields?: Field[];
}

const fieldSchema = new Schema<Field>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  fieldType: { type: String, enum: Object.values(FieldType), required: true },
  expression: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(FieldCategory),
    required: true,
  },
});

const dataSetSchema = new Schema<DataSet>({
  datasetId: { type: String, required: true },
  datasetName: { type: String, required: true },
  description: { type: String },
  fields: { type: [fieldSchema] },
});

export default mongoose.model<DataSet>("DataSet", dataSetSchema);
