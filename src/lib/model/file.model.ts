import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    organizationId: { type: String, default: "" },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    proxyURL: { type: String, require: true },
    uploadedBy: { type: String, default: "" },
    localId: { type: String, default: "" },
    hash: { type: String, default: "" },
    score: { type: String, default: "" },
    size: { type: Number, required: true },
    sizeByte: { type: String, required: true },
    originalFilename: { type: String, require: true },
    mimeType: { type: String, require: true },
    extension: { type: String, require: true },
    sanityCMSId: { type: String, require: true },
    fileUrl: { type: String, default: "" },
    allowedOrganisations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation",
        default: [],
      },
    ],
    isAllowed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;
