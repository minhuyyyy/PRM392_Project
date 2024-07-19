import React, { useEffect, useState, useRef } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { StyledImage, StyledText, StyledView } from '@/components/styled.tsx';
import { Artwork } from '@/contracts/types/Artwork';
import { getArtworkById } from '@/axios/services/artwork-services/artwork-services';
import { ScrollView, Button } from 'react-native';
import {
    addItemToCart,
    getCart,
} from '@/helpers/async-storage-helpers/cart-helpers';
import { useCart } from '@/contexts/cart-context';
import Layout from '@/components/layout';
import Loading from '@/components/loading/loading';
import {
    registerForPushNotificationsAsync,
    schedulePushNotification,
} from '@/helpers/badge-noti/notification-helpers';
import * as Notifications from 'expo-notifications';

export default function ArtworkDetail() {
    const router = useRouter();
    const { id } = useGlobalSearchParams();
    const [artwork, setArtwork] = useState<Artwork>({});
    const { setCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        const fetchArtwork = async () => {
            const res = await getArtworkById(Number(id));
            setArtwork(res.data);
            setLoading(false);
        };
        fetchArtwork();

        registerForPushNotificationsAsync().then(
            (token) => token && setExpoPushToken(token),
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                // console.log('Notification received:', notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    // console.log('Notification response received:', response);
                },
            );

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(
                    notificationListener.current,
                );
            responseListener.current &&
                Notifications.removeNotificationSubscription(
                    responseListener.current,
                );
        };
    }, []);

    const handleAddToCart = async () => {
        if (artwork) {
            await addItemToCart(artwork);
            const cart = await getCart();
            setCart(cart);
            await schedulePushNotification(artwork.name);
        }
    };

    return (
        <Layout>
            {loading ? (
                <StyledView classname='flex-1 justify-center items-center'>
                    <Loading />
                </StyledView>
            ) : (
                <ScrollView>
                    <StyledView classname='flex-1 justify-start mx-6 my-8 p-4 bg-white rounded-lg shadow-lg'>
                        <StyledImage
                            alt={artwork.name}
                            src={artwork.image}
                            resizeMode='contain'
                            classname='w-full h-64 mb-6 rounded-md'
                        />
                        <StyledText
                            text={artwork.name}
                            classname='font-bold text-4xl mb-4 text-gray-800'
                        />
                        <StyledText
                            text={artwork.price?.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                            classname='font-semibold text-2xl mb-8 text-green-600'
                        />
                        <StyledView classname='mb-8'>
                            <StyledText
                                text='Description'
                                classname='font-semibold text-3xl mb-2 text-gray-800'
                            />
                            <StyledText
                                text={artwork.description}
                                classname='text-base text-gray-700 leading-6'
                            />
                        </StyledView>
                        <Button
                            title='Add to cart'
                            className='bg-blue-600 p-4 rounded-lg'
                            onPress={handleAddToCart}
                        />
                    </StyledView>
                </ScrollView>
            )}
        </Layout>
    );
}
