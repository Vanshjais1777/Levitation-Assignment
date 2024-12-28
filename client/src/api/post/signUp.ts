import axios from "axios";

export async function signUp(name: string, email: string, password: string) {
    try {  
        const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/auth/sign-up`, {
            email,
            password,
            name
        });
        return response;
    } catch (error: any) {
        console.error("Signup API error:", error.response?.data || error);
        throw error; // Rethrow to handle in component
    }
}