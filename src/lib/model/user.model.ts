import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: String,
    name: { required: true, type: String },
    authType: { required: true, type: String },
    image: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    secondaryEmail: { type: String, default: "" },
 
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
