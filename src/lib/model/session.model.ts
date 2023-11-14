import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    orgId: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    location: { type: String },
    loginTime: { type: Date, default: Date.now },
    deviceInfo: { type: String },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
