import { Request, Response } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler";

interface SignUpBody {
  email: string;
  password: string;
  name: string;
}

export const signUp = asyncHandler(
  async (req: Request<{}, {}, SignUpBody>, res: Response): Promise<void> => {
    try {
      const { email, password, name } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(400).json({ error: "Email already registered" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(500).json({
        error: "Failed to create user",
        details: error?.message || "Unknown error",
      });
    }
  }
);
