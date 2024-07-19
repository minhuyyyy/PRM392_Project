import Layout from '@/components/layout';
import {
    StyledImage,
    StyledPressable,
    StyledText,
    StyledView,
} from '@/components/styled.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser';

export default function TabTwoScreen() {
    const navigator = useNavigation();
    const { user, setUser } = useUser();

    const handleSignOut = async () => {
        await AsyncStorage.removeItem('user');
        setUser(undefined);
    };

    return (
        <Layout>
            <StyledView classname='flex-1 items-center justify-center p-4'>
                {user ? (
                    <>
                        <StyledImage
                            src='https://example.com/avatar.png'
                            classname='w-24 h-24 rounded-full mb-4'
                            alt='User Avatar'
                            resizeMode='cover'
                        />
                        <StyledText
                            classname='text-xl mb-4'
                            text={user.name}
                        />
                        <StyledText
                            classname='text-2xl mb-4'
                            text={user.email}
                        />

                        <StyledPressable
                            classname='bg-red-500 px-4 py-2 rounded'
                            onPress={handleSignOut}
                        >
                            <StyledText
                                classname='text-white'
                                text='Sign Out'
                            />
                        </StyledPressable>
                    </>
                ) : (
                    <StyledPressable
                        classname='bg-green-500 px-4 py-2 rounded'
                        onPress={() => navigator.navigate('(screens)/sign_in')}
                    >
                        <StyledText
                            classname='text-white'
                            text='Sign In'
                        />
                    </StyledPressable>
                )}
                <StyledPressable
                    classname='mt-4 bg-blue-500 px-4 py-2 rounded'
                    onPress={() => {
                        navigator.navigate('(screens)/bought_artworks');
                    }}
                >
                    <StyledText
                        classname='text-white'
                        text='Go to Bought Artworks'
                    />
                </StyledPressable>
            </StyledView>
        </Layout>
    );
}
