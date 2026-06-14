"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

import User from "@/models/User";

export async function getProfile() {
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

    const user = await User.findOne({
      email: session.user.email,
    }).lean();

    console.log("PROFILE FETCHED");
    console.log(user);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      user: JSON.parse(
        JSON.stringify(user)
      ),
    };
  } catch (error) {
    console.error(
      "GET PROFILE ERROR",
      error
    );

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}