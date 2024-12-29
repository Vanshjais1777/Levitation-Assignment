import { prisma } from "../../db"; // Prisma client import
import { asyncHandler } from "../../utils/asyncHandler"; // Utility for async error handling
import bcrypt from "bcrypt";

// Define the interface to include the 'password' field
interface UserWithPassword {
  id: string;
  email: string;
  name: string | null;
  password: string; // Ensure password is included in the interface
}

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructure the email and password from request body

  try {
    // Fetch user data, including password, from the database using Prisma
    const user: UserWithPassword | null = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true, // Ensure password is selected
      },
    });

    // If no user is found, send an error response
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare the input password with the hashed password from the database using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Exclude the password from the user object to avoid sending it in the response
    const { password: _, ...userWithoutPassword } = user;

    // Return a successful response with user data (excluding password)
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userWithoutPassword, // Send user data excluding the password
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    // In case of an error, send a generic error response
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});