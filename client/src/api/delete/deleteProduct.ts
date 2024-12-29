import axios from "axios";

export async function deleteProduct(productId: string) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/api/products/delete/${productId}`
    );
    return response;
  } catch (error) {
    console.log("deleting product error: ", error);
  }
}
