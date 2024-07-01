import { Text } from 'react-native';
import React from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledText({
    text,
    classname,
}: {
    classname?: string;
    text: string;
}) {
    return (
        <>
            <StyledComponent
                component={Text}
                className={classname}
            >
                {text}
            </StyledComponent>
        </>
    );
}
