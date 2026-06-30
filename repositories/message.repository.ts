import Message from "@/models/Message";

export async function sendMessage(data: {
  conversation: unknown;
  sender: unknown;
  content: string;
}) {
  return Message.create(data);
}

export async function getMessages(
  conversation: unknown,
) {
  return Message.find({
    conversation,
  })
    .populate("sender")
    .sort({
      createdAt: 1,
    });
}

export async function markMessageAsRead(
  id: string,
) {
  return Message.findByIdAndUpdate(
    id,
    {
      isRead: true,
    },
    {
      returnDocument: "after",
    },
  );
}

export async function deleteMessage(
  id: string,
) {
  return Message.findByIdAndDelete(id);
}