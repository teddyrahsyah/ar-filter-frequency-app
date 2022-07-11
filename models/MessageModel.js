import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  sender: {
    type: String,
    max: 255,
  },
  message: {
    type: String,
    required: true,
    max: 255,
  },
}, { timestamps: true });

MessageSchema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("Messages", MessageSchema);
