import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: Number },
		email: { type: String, required: true },
		message: { type: String },
	},
	{
		timestamps: true,
	}
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;