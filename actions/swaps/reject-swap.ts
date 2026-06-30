"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

import { findUserByEmail } from "@/repositories/user.repository";
import { rejectSwapService } from "@/services/swap.service";

export async function rejectSwap(
  swapId: string,
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

    const currentUser =
      await findUserByEmail(
        session.user.email,
      );

    if (!currentUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return await rejectSwapService(
      swapId,
      currentUser._id,
    );
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to reject swap",
    };
  }
}