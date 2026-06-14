"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";

import User from "@/models/User";
import SwapRequest from "@/models/SwapRequest";

export async function getSwaps() {
  try {
    const session = await getServerSession(
      authOptions
    );

    if (!session?.user?.email) {
      return {
        success: false,
        incoming: [],
        outgoing: [],
      };
    }

    await connectDB();

    const currentUser = await User.findOne({
      email: session.user.email,
    });

    if (!currentUser) {
      return {
        success: false,
        incoming: [],
        outgoing: [],
      };
    }

    const incoming = await SwapRequest
      .find({
        receiver: currentUser._id,
      })
      .populate(
        "sender",
        "name email headline"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    const outgoing = await SwapRequest
      .find({
        sender: currentUser._id,
      })
      .populate(
        "receiver",
        "name email headline"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    return {
      success: true,
      incoming: JSON.parse(
        JSON.stringify(incoming)
      ),
      outgoing: JSON.parse(
        JSON.stringify(outgoing)
      ),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      incoming: [],
      outgoing: [],
    };
  }
}