import React from 'react';
import { View } from 'react-native';
import { StyledText, StyledView } from '@/components/styled.tsx'; // Import your styled components
import NavBar from './navigation/nav-bar';
import { StatusBar } from 'expo-status-bar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledView classname='flex-1 my-10'>
            <NavBar />
            <StyledView classname='flex-1 bg-gray-100 mx-4'>
                {children}
            </StyledView>
            <StatusBar style='auto' />
        </StyledView>
    );
};

export default Layout;
