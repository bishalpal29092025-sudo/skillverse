import Link from "next/link";

type SkillCardProps = {
  user: {
    _id: string;
    name: string;
    headline?: string;
    location?: string;
    skillsOffered?: string[];
    skillsWanted?: string[];
  };
};

export default function SkillCard({
  user,
}: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="text-xl font-bold">
        {user.name}
      </h2>

      <p className="mt-2 text-gray-400">
        {user.headline}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {user.location}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold text-[#14F195]">
          Skills Offered
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {user.skillsOffered?.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#14F195]/20 px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-[#9945FF]">
          Skills Wanted
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {user.skillsWanted?.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#9945FF]/20 px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/swaps/create/${user._id}`}
        className="
          mt-6
          inline-flex
          w-full
          items-center
          justify-center
          rounded-xl
          bg-[#14F195]
          px-4
          py-3
          font-medium
          text-black
          transition-all
          hover:opacity-90
        "
      >
        Request Swap
      </Link>
    </div>
  );
}