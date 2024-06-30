import { Button, View } from 'react-native';
import React, { useState } from 'react';
import { StyledInput, StyledText, StyledView } from '@/components/styled.tsx';
import { Link } from 'expo-router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <StyledView>
            <StyledText
                type='title'
                text='Register'
            />
            <StyledInput
                value={email}
                placeholder='Enter email'
                onChangeText={(text: string) => setEmail(text)}
            />
            <StyledInput
                value={password}
                placeholder='Enter password'
                onChangeText={(text: string) => setPassword(text)}
            />
            <Button
                title='Sign In'
                onPress={() => {
                    /* Handle sign in */
                }}
            />
            <View className='flex flex-row mt-4 justify-center'>
                <StyledText
                    type=''
                    text='Already had an account?'
                />
                <Link
                    push
                    href={'/(screens)/sign_in'}
                    className='text-blue-700 ml-1'
                >
                    Sign In
                </Link>
            </View>
        </StyledView>
    );
}
