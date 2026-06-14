"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";

import { acceptSwap } from "@/actions/swaps/accept-swap";
import { rejectSwap } from "@/actions/swaps/reject-swap";

type SwapActionsProps = {
  swapId: string;
};

export default function SwapActions({
  swapId,
}: SwapActionsProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleAccept() {
    setLoading(true);

    await acceptSwap(swapId);

    router.refresh();
  }

  async function handleReject() {
    setLoading(true);

    await rejectSwap(swapId);

    router.refresh();
  }

  return (
    <div className="mt-4 flex gap-3">
      <Button
        onClick={handleAccept}
        isLoading={loading}
      >
        Accept
      </Button>

      <Button
        onClick={handleReject}
        isLoading={loading}
        className="bg-red-500 text-white"
      >
        Reject
      </Button>
    </div>
  );
}
