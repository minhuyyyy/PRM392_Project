import { getCart } from '@/helpers/async-storage-helpers/cart-helpers';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartContextProps {
    cart: any[];
    setCart: (cart: any[]) => void;
}

const CartContext = createContext<CartContextProps>({
    cart: [],
    setCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            const cartData = await getCart();
            setCart(cartData);
        };

        loadCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
