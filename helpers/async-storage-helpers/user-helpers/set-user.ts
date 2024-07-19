import AsyncStorage from "@react-native-async-storage/async-storage";

const setUser = async (user: object) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error setting user', error);
    }
}

export default setUser;