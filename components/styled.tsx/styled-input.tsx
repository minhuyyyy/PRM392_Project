import { TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { StyledComponent } from 'nativewind';

interface StyledInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secured?: boolean;
}

export default function StyledInput({
    placeholder,
    value,
    onChangeText,
    secured,
}: StyledInputProps) {
    return (
        <StyledComponent
            className='border-2 border-gray-500 my-2 h-10 '
            component={TextInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secured}
        />
    );
}
