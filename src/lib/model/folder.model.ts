import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
    organizationId: {type: mongoose.Schema.Types.ObjectId, ref: "Organisation", require: true },
    name: { type: String, required: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File", default: [] }],
    allowedOrganisations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation", default: [] }],
    isAllowed: { type: Boolean, default: false },
    description: { type: String, default: ""},
    website: String
},{ timestamps: true });

const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);

export default Folder;