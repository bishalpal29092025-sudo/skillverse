"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

import { findUserByEmail } from "@/repositories/user.repository";

import {
  getIncomingSwapsService,
  getOutgoingSwapsService,
} from "@/services/swap.service";

export async function getSwaps() {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        incoming: [],
        outgoing: [],
      };
    }

    await connectDB();

    const user =
      await findUserByEmail(
        session.user.email,
      );

    if (!user) {
      return {
        incoming: [],
        outgoing: [],
      };
    }

    return {
      incoming:
        await getIncomingSwapsService(
          user._id,
        ),

      outgoing:
        await getOutgoingSwapsService(
          user._id,
        ),
    };
  } catch (error) {
    console.error(error);

    return {
      incoming: [],
      outgoing: [],
    };
  }
}