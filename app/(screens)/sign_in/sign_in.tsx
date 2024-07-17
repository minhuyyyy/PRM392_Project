import { Button, View } from 'react-native';
import React, { useState } from 'react';
import { StyledInput, StyledText, StyledView } from '@/components/styled.tsx';
import { Link } from 'expo-router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <StyledView>
            <StyledText
                type='title'
                text='Sign In'
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
                    text='Don’t have an account?'
                />
                <Link
                    push
                    href={'/(screens)/register'}
                    className='text-blue-700 ml-1'
                >
                    Register
                </Link>
            </View>
        </StyledView>
    );
}
