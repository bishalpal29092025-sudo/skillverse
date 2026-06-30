import Conversation from "@/models/Conversation";

type CreateConversationData = {
  participants: unknown[];
  swapRequest: unknown;
};

export async function createConversation(
  data: CreateConversationData,
) {
  return Conversation.create({
    participants: data.participants,
    swapRequest: data.swapRequest,
    lastMessage: "",
    isActive: true,
  });
}

export async function findConversationBySwap(
  swapRequest: unknown,
) {
  return Conversation.findOne({
    swapRequest,
  });
}

export async function findConversationById(
  id: string,
) {
  return Conversation.findById(id)
    .populate("participants")
    .populate("swapRequest");
}

export async function findUserConversations(
  userId: unknown,
) {
  return Conversation.find({
    participants: userId,
  })
    .populate("participants")
    .sort({
      updatedAt: -1,
    });
}

export async function updateLastMessage(
  conversationId: string,
  message: string,
) {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      lastMessage: message,
      lastMessageAt: new Date(),
    },
    {
      returnDocument: "after",
    },
  );
}