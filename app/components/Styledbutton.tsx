import { View, Text, Button } from 'react-native';
import React from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledButton({
    classname = '',
    children,
    onPress,
}: {
    classname?: string;
    children?: string;
    onPress: () => void;
}) {
    return (
        <StyledComponent
            component={Button}
            className={classname}
            title={children}
            onPress={onPress}
        />
    );
}
