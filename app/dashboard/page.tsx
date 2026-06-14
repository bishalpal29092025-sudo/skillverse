export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] p-10 text-white">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome {session.user.name}
      </p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}