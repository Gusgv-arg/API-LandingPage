import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		role: { type: String, required: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model("Messages", messageSchema);
export default Message;
