import axios from "axios";

export async function signIn(email: string, password: string) {
    try {  
        const response = await axios.post (`${import.meta.env.VITE_API_ENDPOINT}/api/auth/sign-in`,{
            email: email,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log ("Signin Error: ", error);
    }
}