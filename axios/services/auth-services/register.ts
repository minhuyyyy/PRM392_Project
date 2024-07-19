import { axiosInstance } from "@/axios"

const register = async (email: string, password: string, fullName: string) => {
    const res = await axiosInstance.post('/register',
        {
            password: password,
            confirmPassword: password,
            fullName: fullName,
            emailAddress: email
        })
    return res.data
}

export default register