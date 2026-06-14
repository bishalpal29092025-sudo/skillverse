"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { z } from "zod";

import { signInSchema } from "@/validators/auth.validator";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

type SignInData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    setServerError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Welcome Back
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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

        {serverError && (
          <p className="text-sm text-red-500">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </Card>
  );
}