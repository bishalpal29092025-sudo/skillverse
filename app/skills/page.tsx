export const dynamic = "force-dynamic";

import { getSkills } from "@/actions/skills/get-skills";

import SkillCard from "@/features/skills/components/skill-card";


type SkillUser = {
  _id: string;
  name: string;
  headline?: string;
  location?: string;
  skillsOffered?: string[];
  skillsWanted?: string[];
};

export default async function SkillsPage() {
  const result = await getSkills();

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">Discover Skills</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.users.map((user: SkillUser) => (
          <SkillCard key={user._id} user={user} />
        ))}
      </div>
    </main>
  );
}
