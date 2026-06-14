import mongoose, {
  Schema,
  Model,
  Document,
  Types,
} from "mongoose";

export interface ISwapRequest
  extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;

  offeredSkill: string;
  requestedSkill: string;

  message: string;

  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "completed";
}

const SwapRequestSchema =
  new Schema<ISwapRequest>(
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      offeredSkill: {
        type: String,
        required: true,
        trim: true,
      },

      requestedSkill: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        default: "",
        maxlength: 500,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "rejected",
          "completed",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

const SwapRequest: Model<ISwapRequest> =
  mongoose.models.SwapRequest ||
  mongoose.model<ISwapRequest>(
    "SwapRequest",
    SwapRequestSchema
  );

export default SwapRequest;