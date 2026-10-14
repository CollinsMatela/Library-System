import mongoose from "mongoose";

const LogBookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,

    },
    address: {
      type: String,
      required: true,

    },
    contact: {
      type: String,

    },
    gender: {
      type: String,

    },
    age: {
      type: Number,

    },
    purpose: {
      type: String,
      required: true,

    },
    leaveTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LogBook", LogBookSchema);