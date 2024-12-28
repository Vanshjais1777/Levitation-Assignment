import { prisma } from "../db";
import { asyncHandler } from "../utils/asyncHandler";

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await prisma.product.findMany({
      where: {
        userId: userId,
      },
    });
    res.send(response);
  } catch (error) {
    res.send("Getting products error: " + error);
  }
});
