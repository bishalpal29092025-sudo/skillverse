import Message, {
  IMessage,
} from "@/models/Message";

type SendMessageData = {
  conversation: unknown;
  sender: unknown;
  content: string;
};


export async function sendMessage(data: SendMessageData) {
  return Message.create(data);
}

export async function findMessageById(id: string){
  return Message.findById(id);
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

export async function saveMessage(message: IMessage){
  return message.save();
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