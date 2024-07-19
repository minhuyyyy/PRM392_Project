import { View, Text, TextInput, TextInputIOSProps } from 'react-native';
import React from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledInput({
    value = '',
    type = '',
    classname = '',
    placeholder = '',
    onChange,
    onBlur,
}: {
    value: string;
    type?: string;
    classname?: string;
    placeholder?: string;
    onChange: (text: string) => void;
    onBlur?: () => void;
}) {
    return (
        <StyledComponent
            className={classname}
            component={TextInput}
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={type === 'password'}
            onBlur={onBlur}
        />
    );
}
