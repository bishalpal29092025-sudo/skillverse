"use server";

import connectDB from "@/lib/db";
import { Types } from "mongoose";
import Conversation from "@/models/Conversation";

type CreateConversationData = {
  participants: Types.ObjectId[];
  swapRequestId: Types.ObjectId;
};

export async function createConversation(data: CreateConversationData) {
  try {
    await connectDB();

    const existingConversation = await Conversation.findOne({
      swapRequest: data.swapRequestId,
    } as Record<string, unknown>);

    if (existingConversation) {
      return {
        success: true,
        message: "Conversation already exists",
        conversation: existingConversation,
      };
    }

    const conversation = await Conversation.create({
      participants: data.participants,
      swapRequest: data.swapRequestId,
      lastMessage: "",
      isActive: true,
    });

    return {
      success: true,
      message: "Conversation created successfully",
      conversation,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create conversation",
    };
  }
}
