import React from 'react';
import { StyledView } from '@/components/styled.tsx';
import CheckoutScreen from './checkout';

export default function CartLayout() {
    return (
        <StyledView classname='flex-1 '>
            <CheckoutScreen />
        </StyledView>
    );
}
