import mongoose from "mongoose";

const OrganisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    owner: { type: String, unique: true, required: true },
    members: [{ type: String, unique: true, required: true }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true }
);

const Organisation = mongoose.models.Organisation || mongoose.model("Organisation", OrganisationSchema);

export default Organisation;
