import mongoose from "mongoose";

const InvitationSchema = new mongoose.Schema(
  {
    orgId: { type: String, required: true },
    email: { type: String, required: true },
    state: { type: String, default: 'pending'},
  },
  { timestamps: true }
);

const Invitation =
  mongoose.models.Invitation || mongoose.model("Invitation", InvitationSchema);

export default Invitation;
