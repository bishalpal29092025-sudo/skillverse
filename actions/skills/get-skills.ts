"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";

export async function getSkills() {
  try {
    const session = await getServerSession(authOptions);

    await connectDB();

    const users = await User.find({
      email: {
        $ne: session?.user?.email,
      },
    })
      .select(
        "name headline location skillsOffered skillsWanted"
      )
      .lean();

    return {
      success: true,
      users: JSON.parse(
        JSON.stringify(users)
      ),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      users: [],
    };
  }
}