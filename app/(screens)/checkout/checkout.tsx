import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import StyledView from '@/app/components/StyledView';
import { StyledImage, StyledText } from '@/components/styled.tsx';
import useUser from '@/app/hooks/useUser';
import { buyArtwork } from '@/axios/services/artwork-services';
import WebView from 'react-native-webview';

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { products } = route.params;
    const { user } = useUser();
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

    const handlePlaceOrder = async () => {
        const totalAmount = products.reduce((sum, item) => sum + item.price, 0);

        // Prepare order details with itemId and unitPrice
        const orderDetails = products.map((item) => ({
            artworkId: item.artworkId,
            unitPrice: item.price,
        }));

        // Call buyArtwork function with correct parameters
        const url = await buyArtwork(
            user.MemberId,
            totalAmount,
            1,
            orderDetails,
        );
        console.log(url);

        if (url) {
            setCheckoutUrl(url); // Set the checkout URL state if buyArtwork returns a valid URL
        }
    };

    const renderItem = ({ item }) => (
        <StyledView classname='flex-1 flex-col'>
            <StyledView classname='flex-1 flex-row bg-white mb-2 items-center justify-around py-4'>
                <StyledImage
                    alt={item.name}
                    src={item.image}
                    resizeMode='contain'
                    classname='w-24 h-24'
                />
                <StyledText text={item.name} />
                <StyledText
                    text={item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                />
            </StyledView>
        </StyledView>
    );

    if (checkoutUrl) {
        return (
            <WebView
                useWebKit
                onLoadStart={() => console.log('Loading started')}
                onLoadEnd={() => console.log('Loading ended')}
                onError={(error) => console.log('WebView error: ', error)}
                onNavigationStateChange={(state) => {
                    console.log('WebView state: ', state);
                    if (
                        state.url &&
                        state.url.includes('http://(screens)/order-status/')
                    ) {
                        const urlParams = new URLSearchParams(
                            state.url.split('?')[1],
                        );
                        const orderId = urlParams.get('orderCode');
                        if (orderId) {
                            navigation.navigate('(screens)/order-status', {
                                orderId,
                            });
                        }
                    }
                }}
                source={{ uri: 'https://youtube.com' }}
            />
        );
    }

    return (
        <StyledView classname='flex-1 w-full'>
            <StyledView classname='p-4 bg-gray-100'>
                <StyledText
                    classname='text-xl font-bold'
                    text='User Information'
                />
                <StyledText
                    classname='mt-2'
                    text={`Name: ${user?.name}`}
                />
                <StyledText
                    classname='mt-2'
                    text={`Email: ${user?.email}`}
                />
            </StyledView>
            <Button
                title='Place Order'
                onPress={handlePlaceOrder}
            />
            <FlatList
                style={styles.container}
                data={products}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={(item) => item.artworkId.toString()}
            />
        </StyledView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});
