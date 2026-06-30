"use server";

import { getServerSession } from "next-auth";

import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

import { profileSchema } from "@/validators/profile.validator";
import { updateProfileService } from "@/services/profile.service";

type ProfileData = {
  headline: string;
  bio: string;
  location: string;
  skillsOffered: string[];
  skillsWanted: string[];
};

export async function updateProfile(
  data: ProfileData,
) {
  try {
    const validated =
      profileSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors:
          validated.error.flatten(),
      };
    }

    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    return await updateProfileService({
      email: session.user.email,

      headline: validated.data.headline,
      bio: validated.data.bio,
      location: validated.data.location,

      skillsOffered:
        validated.data.skillsOffered,

      skillsWanted:
        validated.data.skillsWanted,
    });
  } catch (error) {
    console.error(
      "PROFILE UPDATE ERROR:",
      error,
    );

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}