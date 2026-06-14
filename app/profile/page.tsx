export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import ProfileForm from "@/features/profile/components/profile-form";

import { getProfile } from "@/actions/profile/get-profile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const result = await getProfile();

  if (!result.success) {
    return <div>Failed to load profile</div>;
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8 text-white">
      <ProfileForm user={result.user} />
    </main>
  );
}
