import {
  findUserByEmail,
  updateUser,
} from "@/repositories/user.repository";

type UpdateProfileData = {
  email: string;
  headline: string;
  bio: string;
  location: string;
  skillsOffered: string[];
  skillsWanted: string[];
};

export async function updateProfileService(
  data: UpdateProfileData,
) {
  const user = await findUserByEmail(
    data.email,
  );

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  await updateUser(user._id.toString(), {
    headline: data.headline,
    bio: data.bio,
    location: data.location,
    skillsOffered:
      data.skillsOffered,
    skillsWanted:
      data.skillsWanted,
  });

  return {
    success: true,
    message:
      "Profile updated successfully",
  };
}