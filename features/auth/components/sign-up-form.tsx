"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { signUpSchema } from "@/validators/auth.validator";
import { signUpAction } from "@/actions/auth/sign-up";

import { z } from "zod";

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    setServerError("");

    const result = await signUpAction(data);

    if (!result.success) {
      setServerError(result.message || "Something went wrong");
      return;
    }

    router.replace("/sign-in");
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Name"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          placeholder="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
