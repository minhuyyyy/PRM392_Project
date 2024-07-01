import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Layout from '@/components/layout';
import Cart from './cart';
import { StyledView } from '@/components/styled.tsx';

export default function CartLayout() {
    return (
        <StyledView classname='flex-1 '>
            <Cart />
        </StyledView>
    );
}
