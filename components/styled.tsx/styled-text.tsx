import { Text } from 'react-native';
import React from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledText({
    type,
    text,
}: {
    className?: string;
    text: string;
    type: string;
}) {
    return (
        <>
            <StyledComponent
                component={Text}
                className={type === 'title' ? 'text-2xl font-semibold' : '' }
            >
                {text}
            </StyledComponent>
        </>
    );
}
