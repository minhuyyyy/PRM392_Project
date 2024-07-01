import { Artwork } from '@/contracts/types/Artwork';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'user_cart';

export const addItemToCart = async (item: Artwork) => {
    try {
        const cart = await getCart();
        cart.push(item.artworkId); // Store only the artworkId

        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error adding item to cart', error);
    }
};

export const getCart = async (): Promise<number[]> => {
    try {
        const cart = await AsyncStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart', error);
        return [];
    }
};

export const removeItemFromCart = async (itemId: number) => {
    try {
        const cart = await getCart();
        const updatedCart = cart.filter((item: number) => item !== itemId); // Filter by artworkId
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    } catch (error) {
        console.error('Error removing item from cart', error);
    }
};

export const clearCart = async () => {
    try {
        await AsyncStorage.removeItem(CART_KEY);
    } catch (error) {
        console.error('Error clearing cart', error);
    }
};
