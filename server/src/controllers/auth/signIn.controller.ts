import { prisma } from "../../db";
import { asyncHandler } from "../../utils/asyncHandler";
import bcrypt from "bcrypt";

export const signIn = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!response) {
      res.send("User not found");
    } else {
      bcrypt.compare(password, response.password, function (err, result) {
        if (!result) {
          res.send("Wrong Password");
        } else {
          res.send({ message: "user login successfully.", data: response });
        }
      });
    }
  } catch (error) {
    res.send("SignIn error: " + error);
  }
});
