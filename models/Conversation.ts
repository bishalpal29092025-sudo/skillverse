import mongoose, {
  Schema,
  Model,
  HydratedDocument,
  Types,
} from "mongoose";

export interface IConversation {
  participants: Types.ObjectId[];

  swapRequest: Types.ObjectId;

  lastMessage: string;

  lastMessageAt?: Date;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export type ConversationDocument =
  HydratedDocument<IConversation>;

const ConversationSchema =
  new Schema<IConversation>(
    {
      participants: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        required: true,
      },

      swapRequest: {
        type: Schema.Types.ObjectId,
        ref: "SwapRequest",
        required: true,
        unique: true,
      },

      lastMessage: {
        type: String,
        default: "",
      },

      lastMessageAt: {
        type: Date,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
  );

// Index for faster participant lookups
ConversationSchema.index({
  participants: 1,
});

const Conversation: Model<IConversation> =
  mongoose.models.Conversation ??
  mongoose.model<IConversation>(
    "Conversation",
    ConversationSchema,
  );

export default Conversation;