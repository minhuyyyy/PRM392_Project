import { axiosInstance } from "@/axios"
import { setUser } from "@/helpers/async-storage-helpers/user-helpers"
import { Alert } from "react-native"

const login = async (email: string, password: string) => {
    try {
        const res = await axiosInstance.post('/login', {
            emailAddress: email,
            accountPassword: password
        })

        if (res.status === 200) {

            await setUser(res.data.token)
            return res
        } else if (res.status === 401) {
            Alert.alert(
                'Error',
                'Invalid credentials. Please login again.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK', onPress: () => console.log('User pressed OK') }
                ]
            )
        }
    } catch (error) {
        console.error("An error occurred during login:", error)
        Alert.alert(
            'Error',
            'An error occurred. Please try again later.',
            [
                { text: 'OK', onPress: () => console.log('Error alert dismissed') }
            ]
        )
    }
}

export default login