import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { StyledText, StyledView } from '../styled.tsx';
import { useRouter } from 'expo-router';
import { TabBarIcon } from './TabBarIcon';
import { getCart } from '@/helpers/async-storage-helpers/cart-helpers/index';
import { useCart } from '@/contexts/cart-context';

export default function NavBar() {
    const router = useRouter();
    const items = getCart();
    const { cart } = useCart();
    return (
        <StyledView classname='bg-blue-600 p-4 flex-row justify-between items-center shadow-md'>
            <StyledText
                classname='text-white text-xl font-semibold'
                text='Arthub'
            />
            <TouchableOpacity onPress={() => router.push('/cart')}>
                <StyledView classname='flex-row items-center'>
                    <Pressable>
                        <TabBarIcon name='shoppingcart' />
                    </Pressable>
                    <StyledView classname='ml-2 w-6 h-6 bg-white rounded-full items-center justify-center'>
                        <StyledText
                            classname='text-blue-600 text-sm font-bold'
                            text={cart.length.toString()}
                        />
                    </StyledView>
                </StyledView>
            </TouchableOpacity>
        </StyledView>
    );
}
