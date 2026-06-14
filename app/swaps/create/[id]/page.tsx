import CreateSwapForm from "@/features/swaps/components/create-swap-form";

type CreateSwapPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CreateSwapPage({
  params,
}: CreateSwapPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <CreateSwapForm receiverId={id} />
      </div>
    </main>
  );
}