import AsyncStorage from "@react-native-async-storage/async-storage";

const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');

        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting user', error);
        return null;
    }
}

export default getUser;