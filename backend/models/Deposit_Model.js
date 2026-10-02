import mongoose from "mongoose";

const IDDepositSchema = new mongoose.Schema(
  {
    idType: {
      type: String,
      required: true,
      trim: true,
    },

    idNumber: {
      type: String,
      required: true,
      trim: true,
    },

    idName: {
      type: String,
      required: true,
      trim: true,
    },

    depositDate: {
      type: Date,
      default: Date.now,
    },

    returnedDate: {
      type: Date,
      default: null,
    },

    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    returnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    status: {
      type: String,
      enum: ["held", "returned"],
      default: "held",
    },
  },
  {
    timestamps: true,
  }
);

const IDDeposit = mongoose.model("IDDeposit", IDDepositSchema);

export default IDDeposit;