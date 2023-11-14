import mongoose from "mongoose";

const OrganisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    description: { type: String, required: true },
    owner: { type: String },
    members: [{ type: String }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true }
);

const Organisation =
  mongoose.models.Organisation ||
  mongoose.model("Organisation", OrganisationSchema);

export default Organisation;
