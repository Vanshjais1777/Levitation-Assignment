import axios from "axios";

export async function createProduct(userId: string, name: string, qty: number, rate: number, totalAmount: number) {
    try {  
        const response = await axios.post (`${import.meta.env.VITE_API_ENDPOINT}/api/products/${userId}/add`,{
            name: name,
            qty: qty,
            rate: rate,
            totalAmount: totalAmount
        })
        return response;
    } catch (error) {
        console.log ("creating product error: ", error);
    }
}