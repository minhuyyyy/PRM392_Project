import { Button, View } from 'react-native';
import React, { useState } from 'react';
import { StyledInput, StyledText, StyledView } from '@/components/styled.tsx';
import { Link } from 'expo-router';
import login from '@/axios/services/auth-services/login';
import { useNavigation } from '@react-navigation/native';
import useUser from '@/app/hooks/useUser';
import { jwtDecode } from 'jwt-decode';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigation();

    const { user, setUser } = useUser();
    const handleSignIn = async () => {
        const res = await login(email, password);
        if (res?.status === 200) {
            const decoded = jwtDecode(res.data.token);
            setUser(decoded);

            navigator.navigate('(tabs)');
        }
    };
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
                secured={true}
            />
            <Button
                title='Sign In'
                onPress={() => {
                    handleSignIn();
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
