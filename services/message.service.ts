import {
  sendMessage,
  getMessages,
  markMessageAsRead,
} from "@/repositories/message.repository";

import {
  findConversationById,
  updateLastMessage,
} from "@/repositories/conversation.repository";

type SendMessageData = {
  conversationId: string;
  senderId: unknown;
  content: string;
};

export async function sendMessageService(
  data: SendMessageData,
) {
  const conversation =
    await findConversationById(
      data.conversationId,
    );

  if (!conversation) {
    return {
      success: false,
      message: "Conversation not found",
    };
  }

  if (!data.content.trim()) {
    return {
      success: false,
      message: "Message cannot be empty",
    };
  }

  const message = await sendMessage({
    conversation: data.conversationId,
    sender: data.senderId,
    content: data.content.trim(),
  });

  await updateLastMessage(
    data.conversationId,
    data.content.trim(),
  );

  return {
    success: true,
    message: "Message sent successfully",
    data: message,
  };
}

export async function getMessagesService(
  conversationId: string,
) {
  const conversation =
    await findConversationById(
      conversationId,
    );

  if (!conversation) {
    return {
      success: false,
      message: "Conversation not found",
      data: [],
    };
  }

  const messages =
    await getMessages(conversationId);

  return {
    success: true,
    data: messages,
  };
}

export async function markMessageAsReadService(
  messageId: string,
) {
  const message =
    await markMessageAsRead(messageId);

  if (!message) {
    return {
      success: false,
      message: "Message not found",
    };
  }

  return {
    success: true,
    message: "Message marked as read",
  };
}