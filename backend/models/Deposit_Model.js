import mongoose from "mongoose";

const IDDepositSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
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
      type: String,
      required: true,
    },

    returnedBy: {
      type: String,
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