import mongoose, { Document, Schema } from "mongoose";

interface IDepartment extends Document {
  departmentName?: string;
  apiKey?: string;
  contact?: {
    name: string;
    email: string;
    telephone: number;
    additionalInfo?: Array<{ key: string; value: string }>;
  };
}

const departmentSchema = new Schema(
  {
    departmentName: String,
    apiKey: String,
    contact: {
      name: String,
      email: String,
      telephone: Number,
      additionalInfo: [
        {
          key: String,
          value: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const Department = mongoose.model<IDepartment>("Department", departmentSchema);

export { Department };
