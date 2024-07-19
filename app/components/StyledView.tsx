import { View, Text, SafeAreaView } from 'react-native';
import React, { ReactElement } from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledView({
    classname = '',
    children,
}: {
    classname?: string;
    children: ReactElement[] | ReactElement;
}) {
    return (
        <StyledComponent
            component={SafeAreaView}
            className={classname}
        >
            {children}
        </StyledComponent>
    );
}
