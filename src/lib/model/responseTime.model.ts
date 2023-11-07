import mongoose from "mongoose";

const responseTimeSchema = new mongoose.Schema({
    organizationId: {type: mongoose.Schema.Types.ObjectId, ref: "Organisation", require: true },
    responseTime:[{timestamps: {type: Date, default:Date.now()}, time:Number}]
});

const ResponseTime = mongoose.models.ResponseTime || mongoose.model("Organisation", responseTimeSchema);

export default ResponseTime;
