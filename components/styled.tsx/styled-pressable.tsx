import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledPressable({
    children,
    classname,
    onPress,
}: {
    children: React.ReactNode;
    classname?: string;
    onPress: () => void;
}) {
    return (
        <StyledComponent
            component={Pressable}
            className={classname}
            onPress={onPress}
        >
            {children}
        </StyledComponent>
    );
}
