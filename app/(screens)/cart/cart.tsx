// screens/CartScreen.tsx
import React, { useEffect, useState } from 'react';
import { Artwork } from '@/contracts/types/Artwork';
import { Button, FlatList, StyleSheet } from 'react-native';
import {
    getCart,
    removeItemFromCart,
} from '@/helpers/async-storage-helpers/cart-helpers';
import { getArtworkById } from '@/axios/services/artwork-services';
import Loading from '@/components/loading/loading';
import { useNavigation } from '@react-navigation/native';
import StyledView from '@/app/components/StyledView';
import { StyledImage, StyledText } from '@/components/styled.tsx';
import useUser from '@/app/hooks/useUser';

export default function CartScreen() {
    const [products, setProducts] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigation();
    const { user } = useUser();

    useEffect(() => {
        const getCartItems = async () => {
            const items = await getCart();
            const productsData: Artwork[] = [];

            for (const itemId of items) {
                try {
                    const res = await getArtworkById(itemId);
                    productsData.push(res.data);
                } catch (error) {
                    console.error(
                        `Error fetching artwork with ID ${itemId}`,
                        error,
                    );
                }
            }

            setProducts(productsData);
            setLoading(false);
        };

        getCartItems();
    }, []);

    const handleRemoveItem = async (artworkId: number) => {
        await removeItemFromCart(artworkId);
        setProducts((prevProducts) =>
            prevProducts.filter((item) => item.artworkId !== artworkId),
        );
    };

    const renderItem = ({ item }: { item: Artwork }) => (
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
                <Button
                    title='Remove'
                    onPress={() => handleRemoveItem(item.artworkId)}
                />
            </StyledView>
        </StyledView>
    );

    return (
        <StyledView classname='flex-1 w-full'>
            {loading ? (
                <StyledView classname='flex-1 w-full mb-2 flex-row justify-center items-center'>
                    <Loading />
                </StyledView>
            ) : (
                <>
                    <FlatList
                        style={styles.container}
                        data={products}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.artworkId.toString()}
                    />
                    <Button
                        title='Checkout'
                        onPress={() =>
                            navigator.navigate('(screens)/checkout', {
                                products,
                            })
                        }
                    />
                </>
            )}
        </StyledView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});
