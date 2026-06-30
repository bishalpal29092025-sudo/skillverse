import SwapRequest, {
  ISwapRequest,
} from "@/models/SwapRequest";

type CreateSwapData = {
  sender: unknown;
  receiver: unknown;
  offeredSkill: string;
  requestedSkill: string;
  message: string;
};

export async function createSwap(
  data: CreateSwapData,
) {
  return SwapRequest.create(data);
}

export async function findSwapById(
  id: string,
) {
  return SwapRequest.findById(id);
}

export async function findSwapForReceiver(
  swapId: string,
  receiverId: unknown,
) {
  return SwapRequest.findOne({
    _id: swapId,
    receiver: receiverId,
  });
}

export async function saveSwap(
  swap: ISwapRequest,
) {
  return swap.save();
}

export async function findIncomingSwaps(
  receiverId: unknown,
) {
  return SwapRequest.find({
    receiver: receiverId,
  })
    .populate("sender")
    .sort({
      createdAt: -1,
    });
}

export async function findOutgoingSwaps(
  senderId: unknown,
) {
  return SwapRequest.find({
    sender: senderId,
  })
    .populate("receiver")
    .sort({
      createdAt: -1,
    });
}