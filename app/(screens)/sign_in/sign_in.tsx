import { Button, View } from 'react-native';
import React, { useState } from 'react';
import { StyledInput, StyledText, StyledView } from '@/components/styled.tsx';
import { Link } from 'expo-router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <StyledView classname='flex-1 justify-center mx-10'>
            <StyledText
                text='Sign In'
                classname='font-semibold text-2xl'
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
            <StyledView classname='flex flex-row mt-4 justify-center'>
                <StyledText text='Don’t have an account?' />
                <Link
                    push
                    href={'/(screens)/register'}
                    className='text-blue-700 ml-1'
                >
                    Register
                </Link>
            </StyledView>
        </StyledView>
    );
}
