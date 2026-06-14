"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

import User from "@/models/User";
import { profileSchema } from "@/validators/profile.validator";

type ProfileData = {
  headline: string;
  bio: string;
  location: string;
  skillsOffered: string[];
  skillsWanted: string[];
};

export async function updateProfile(
  data: ProfileData
) {
  try {
    console.log("STEP 1: Action called");

    const validated = profileSchema.safeParse(data);

    if (!validated.success) {
      console.log("VALIDATION FAILED");

      return {
        success: false,
        errors: validated.error.flatten(),
      };
    }

    console.log("STEP 2: Validation passed");
    console.log(validated.data);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    console.log("STEP 3: Database connected");

    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user.email,
      },
      {
        $set: {
          headline: validated.data.headline,
          bio: validated.data.bio,
          location: validated.data.location,
          skillsOffered: validated.data.skillsOffered,
          skillsWanted: validated.data.skillsWanted,
        },
      },
      {
        returnDocument: "after",
      }
    );

    console.log("UPDATED USER");
    console.log(
      JSON.stringify(updatedUser, null, 2)
    );

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error(
      "PROFILE UPDATE ERROR",
      error
    );

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}