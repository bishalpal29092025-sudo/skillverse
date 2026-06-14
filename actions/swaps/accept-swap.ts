"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";

import User from "@/models/User";
import SwapRequest from "@/models/SwapRequest";

export async function acceptSwap(
  swapId: string
) {
  try {
    const session = await getServerSession(
      authOptions
    );

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const currentUser = await User.findOne({
      email: session.user.email,
    });

    if (!currentUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const swap =
      await SwapRequest.findOne({
        _id: swapId,
        receiver: currentUser._id,
      });

    if (!swap) {
      return {
        success: false,
        message:
          "Swap request not found",
      };
    }

    swap.status = "accepted";

    await swap.save();

    return {
      success: true,
      message: "Swap accepted",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Failed to accept swap",
    };
  }
}