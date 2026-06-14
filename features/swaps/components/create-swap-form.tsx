"use client";

import { useState } from "react";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";

import { createSwap } from "@/actions/swaps/create-swap";

type CreateSwapFormProps = {
  receiverId: string;
};

export default function CreateSwapForm({
  receiverId,
}: CreateSwapFormProps) {
  const [offeredSkill, setOfferedSkill] =
    useState("");

  const [requestedSkill, setRequestedSkill] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (
      !offeredSkill.trim() ||
      !requestedSkill.trim()
    ) {
      setErrorMessage(
        "Please fill all required fields."
      );

      return;
    }

    setLoading(true);

    const result = await createSwap({
      receiverId,
      offeredSkill,
      requestedSkill,
      message,
    });

    setLoading(false);

    if (!result.success) {
      setErrorMessage(
        result.message ||
          "Failed to send request."
      );

      return;
    }

    setSuccessMessage(
      "Swap request sent successfully!"
    );

    setOfferedSkill("");
    setRequestedSkill("");
    setMessage("");
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">
        Request Skill Swap
      </h1>

      <p className="mb-8 text-gray-400">
        Send a request to exchange skills.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          placeholder="Skill I Can Offer"
          value={offeredSkill}
          onChange={(e) =>
            setOfferedSkill(
              e.target.value
            )
          }
        />

        <Input
          placeholder="Skill I Want To Learn"
          value={requestedSkill}
          onChange={(e) =>
            setRequestedSkill(
              e.target.value
            )
          }
        />

        <Textarea
          placeholder="Personal Message (Optional)"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
        />

        {errorMessage && (
          <p className="text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="text-sm text-[#14F195]">
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={loading}
        >
          Send Swap Request
        </Button>
      </form>
    </Card>
  );
}