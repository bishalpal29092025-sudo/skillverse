"use server";

import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { signUpSchema } from "@/validators/auth.validator";

export async function signUpAction(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // 1. Validate the incoming data against the Zod schema
    const validated = signUpSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.flatten(),
      };
    }

    // 2. Connect to the database
    await connectDB();

    // 3. Check if the user already exists in the database
    const existingUser = await User.findOne({
      email: validated.data.email,
    });

    if (existingUser) { 
      return {
        success: false,
        message: "User already exists",
      };
    }

    // 4. Hash the password securely
    const hashedPassword = await bcrypt.hash(
      validated.data.password,
      10
    );

    // 5. Create and save the new user
    await User.create({
      name: validated.data.name,
      email: validated.data.email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    // 6. Log the exact error for server-side debugging
    console.error("Sign Up Error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}