import mongoose from "mongoose";


const dataTrafficSchema = new mongoose.Schema({
  organizationId: {type: mongoose.Schema.Types.ObjectId, ref: "Organisation", require: true },
  dataTransferred: [{ type: Number, required: true, timestamp: { type: Date, default: Date.now } }], 
},{ timestamps:true });

const DataTraffic = mongoose.models.DataTraffic|| mongoose.model("DataTraffic", dataTrafficSchema);

export default DataTraffic;
