import { Text, TextInput, Button, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
    return (
        <SafeAreaView className='flex flex-col justify-center items-center'>
            <Text>Sign In</Text>
            <TextInput placeholder='Enter email:' />
            <TextInput placeholder='Enter password:' />
            <View>
                <Button title='Sign In' />
            </View>
        </SafeAreaView>
    );
}
