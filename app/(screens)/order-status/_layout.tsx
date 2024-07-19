import React from 'react';
import { StyledView } from '@/components/styled.tsx';
import OrderStatusScreen from './order_status';

export default function CartLayout() {
    return (
        <StyledView classname='flex-1 '>
            <OrderStatusScreen />
        </StyledView>
    );
}
