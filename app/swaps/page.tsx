export const dynamic = "force-dynamic";
import { getSwaps } from "@/actions/swaps/get-swaps";

import Card from "@/components/ui/card";
import SwapActions from "@/features/swaps/components/swap-actions";


type SwapUser = {
  name: string;
  email: string;
  headline?: string;
};

type Swap = {
  _id: string;

  sender?: SwapUser;

  receiver?: SwapUser;

  offeredSkill: string;
  requestedSkill: string;

  message?: string;

  status: string;
};

export default async function SwapsPage() {
  const result = await getSwaps();

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
        <h1 className="text-4xl font-bold">
          My Swaps
        </h1>

        {/* Incoming Requests */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            Incoming Requests
          </h2>

          {result.incoming.length === 0 ? (
            <p className="text-gray-400">
              No incoming requests.
            </p>
          ) : (
            <div className="grid gap-4">
              {result.incoming.map(
                (swap: Swap) => (
                  <Card key={swap._id}>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">
                          From:
                        </span>{" "}
                        {swap.sender?.name}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Offers:
                        </span>{" "}
                        {swap.offeredSkill}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Wants:
                        </span>{" "}
                        {swap.requestedSkill}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Message:
                        </span>{" "}
                        {swap.message ||
                          "No message"}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Status:
                        </span>{" "}
                        <span
                          className={
                            swap.status ===
                            "accepted"
                              ? "text-[#14F195]"
                              : swap.status ===
                                  "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }
                        >
                          {swap.status}
                        </span>
                      </p>

                      {swap.status ===
                        "pending" && (
                        <SwapActions
                          swapId={swap._id}
                        />
                      )}
                    </div>
                  </Card>
                )
              )}
            </div>
          )}
        </section>

        {/* Outgoing Requests */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            Outgoing Requests
          </h2>

          {result.outgoing.length === 0 ? (
            <p className="text-gray-400">
              No outgoing requests.
            </p>
          ) : (
            <div className="grid gap-4">
              {result.outgoing.map(
                (swap: Swap) => (
                  <Card key={swap._id}>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">
                          To:
                        </span>{" "}
                        {swap.receiver?.name}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Offers:
                        </span>{" "}
                        {swap.offeredSkill}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Wants:
                        </span>{" "}
                        {swap.requestedSkill}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Message:
                        </span>{" "}
                        {swap.message ||
                          "No message"}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Status:
                        </span>{" "}
                        <span
                          className={
                            swap.status ===
                            "accepted"
                              ? "text-[#14F195]"
                              : swap.status ===
                                  "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }
                        >
                          {swap.status}
                        </span>
                      </p>
                    </div>
                  </Card>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}