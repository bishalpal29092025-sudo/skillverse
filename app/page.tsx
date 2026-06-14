import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex rounded-full border border-[#14F195]/20 bg-[#14F195]/10 px-4 py-2 text-sm text-[#14F195]">
            Skill Exchange Platform
          </span>

          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Learn Skills.
            <br />
            <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
              Teach Skills.
            </span>
            <br />
            Grow Together.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
            Connect with students and professionals around the world.
            Exchange knowledge, learn new skills, and help others grow.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-xl bg-[#14F195] px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Get Started
            </Link>

            <Link
              href="/sign-in"
              className="rounded-xl border border-gray-700 px-8 py-4 font-semibold transition hover:border-[#9945FF]"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 backdrop-blur">
              <h3 className="mb-2 text-2xl font-bold text-[#14F195]">
                100+
              </h3>
              <p className="text-gray-400">
                Skills Available
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 backdrop-blur">
              <h3 className="mb-2 text-2xl font-bold text-[#9945FF]">
                1000+
              </h3>
              <p className="text-gray-400">
                Active Learners
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 backdrop-blur">
              <h3 className="mb-2 text-2xl font-bold text-[#14F195]">
                500+
              </h3>
              <p className="text-gray-400">
                Skill Swaps Completed
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}