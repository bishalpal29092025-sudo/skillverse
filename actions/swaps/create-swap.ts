"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

import User from "@/models/User";
import SwapRequest from "@/models/SwapRequest";

type CreateSwapData = {
  receiverId: string;
  offeredSkill: string;
  requestedSkill: string;
  message: string;
};

export async function createSwap(
  data: CreateSwapData
) {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const sender = await User.findOne({
      email: session.user.email,
    });

    if (!sender) {
      return {
        success: false,
        message: "Sender not found",
      };
    }

    const receiver = await User.findById(
      data.receiverId
    );

    if (!receiver) {
      return {
        success: false,
        message: "Receiver not found",
      };
    }

    await SwapRequest.create({
      sender: sender._id,
      receiver: receiver._id,

      offeredSkill: data.offeredSkill,
      requestedSkill:
        data.requestedSkill,

      message: data.message,
    });

    return {
      success: true,
      message:
        "Swap request sent successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}