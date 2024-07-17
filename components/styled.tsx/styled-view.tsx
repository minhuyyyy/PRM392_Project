import React from 'react';
import { StyledComponent, styled } from 'nativewind';
import { SafeAreaView } from 'react-native';

export default function StyledView({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StyledComponent
            component={SafeAreaView}
            className='flex-1 justify-center mx-10'
        >
            {children}
        </StyledComponent>
    );
}
