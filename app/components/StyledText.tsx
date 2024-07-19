import { View, Text } from 'react-native';
import React, { ReactElement } from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledText({
    classname = '',
    children,
}: {
    classname?: string;
    children: string | number;
}) {
    return (
        <StyledComponent
            component={Text}
            className={classname}
        >
            {children}
        </StyledComponent>
    );
}
