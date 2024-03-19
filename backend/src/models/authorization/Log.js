import { Schema, model } from "mongoose";

const logSchema = new Schema(
  {
    registradoPor: { type: Schema.Types.ObjectId, ref: 'User' },
    method: { type: String, required: true },
    url: { type: String, required: true },
    requestHeaders: { type: Schema.Types.Mixed },
    requestBody: { type: Schema.Types.Mixed },
    responseStatus: { type: Number },
    responseHeaders: { type: Schema.Types.Mixed },
    ipClient: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Log", logSchema);
