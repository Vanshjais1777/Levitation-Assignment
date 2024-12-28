import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db";

export const addProducts = asyncHandler(async (req, res) => {
  try {
    const { name, qty, rate, totalAmount } = req.body;
    const { userId } = req.params;

    const response = await prisma.product.create({
      data: {
        userId: userId,
        name: name,
        qty: qty,
        rate: rate,
        totalAmt: totalAmount,
      },
    });

    res.send("product added successfully" + response);
  } catch (e) {
    res.send("adding product error: " + e);
  }
});
