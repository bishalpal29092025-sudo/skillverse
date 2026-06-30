import {
  createSwap,
  findSwapForReceiver,
  saveSwap,
  findIncomingSwaps,
  findOutgoingSwaps,
} from "@/repositories/swap.repository";

import {
  createConversation,
  findConversationBySwap,
} from "@/repositories/conversation.repository";

import { SwapDto } from "@/types/swap";

type CreateSwapData = {
  sender: unknown;
  receiver: unknown;
  offeredSkill: string;
  requestedSkill: string;
  message: string;
};

type PopulatedUser = {
  _id: {
    toString(): string;
  };
  name: string;
  email: string;
  headline?: string;
};

type PopulatedSwap = {
  _id: {
    toString(): string;
  };
  sender?: PopulatedUser;
  receiver?: PopulatedUser;
  offeredSkill: string;
  requestedSkill: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
};

function toSwapDto(
  swap: PopulatedSwap,
): SwapDto {
  return {
    _id: swap._id.toString(),

    sender: swap.sender
      ? {
          _id: swap.sender._id.toString(),
          name: swap.sender.name,
          email: swap.sender.email,
          headline: swap.sender.headline,
        }
      : undefined,

    receiver: swap.receiver
      ? {
          _id: swap.receiver._id.toString(),
          name: swap.receiver.name,
          email: swap.receiver.email,
          headline: swap.receiver.headline,
        }
      : undefined,

    offeredSkill: swap.offeredSkill,
    requestedSkill: swap.requestedSkill,
    message: swap.message ?? "",
    status: swap.status,
    createdAt: swap.createdAt.toISOString(),
    updatedAt: swap.updatedAt.toISOString(),
  };
}

export async function createSwapService(
  data: CreateSwapData,
) {
  await createSwap(data);

  return {
    success: true,
    message: "Swap request sent successfully",
  };
}

export async function acceptSwapService(
  swapId: string,
  receiverId: unknown,
) {
  const swap = await findSwapForReceiver(
    swapId,
    receiverId,
  );

  if (!swap) {
    return {
      success: false,
      message: "Swap request not found",
    };
  }

  if (swap.status !== "pending") {
    return {
      success: false,
      message:
        "Swap has already been processed",
    };
  }

  swap.status = "accepted";

  await saveSwap(swap);

  const conversation =
    await findConversationBySwap(
      swap._id,
    );

  if (!conversation) {
    await createConversation({
      participants: [
        swap.sender,
        swap.receiver,
      ],
      swapRequest: swap._id,
    });
  }

  return {
    success: true,
    message:
      "Swap accepted successfully",
    };
}

export async function rejectSwapService(
  swapId: string,
  receiverId: unknown,
) {
  const swap = await findSwapForReceiver(
    swapId,
    receiverId,
  );

  if (!swap) {
    return {
      success: false,
      message: "Swap request not found",
    };
  }

  if (swap.status !== "pending") {
    return {
      success: false,
      message:
        "Swap has already been processed",
    };
  }

  swap.status = "rejected";

  await saveSwap(swap);

  return {
    success: true,
    message:
      "Swap rejected successfully",
    };
}

export async function getIncomingSwapsService(
  userId: unknown,
): Promise<SwapDto[]> {
  const swaps =
    await findIncomingSwaps(userId);

  return swaps.map((swap) =>
    toSwapDto(swap as unknown as PopulatedSwap),
  );
}

export async function getOutgoingSwapsService(
  userId: unknown,
): Promise<SwapDto[]> {
  const swaps =
    await findOutgoingSwaps(userId);

  return swaps.map((swap) =>
    toSwapDto(swap as unknown as PopulatedSwap),
  );
}