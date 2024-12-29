import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db";

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;

    const response = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.send("Product deleted successfully: " + response);
  } catch (e) {
    res.send("Deleting product error: " + e);
  }
});
