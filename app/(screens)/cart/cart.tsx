import React, { useEffect, useState } from 'react';
import { Artwork } from '@/contracts/types/Artwork';
import { Button, FlatList, StyleSheet } from 'react-native';
import {
    getCart,
    removeItemFromCart,
} from '@/helpers/async-storage-helpers/cart-helpers';
import { getArtworkById } from '@/axios/services/artwork-services';
import { StyledImage, StyledText, StyledView } from '@/components/styled.tsx';
import Loading from '@/components/loading/loading';
import { openLink } from '@/helpers/link-opener/link-opener';

export default function Cart() {
    const [products, setProducts] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCartItems = async () => {
            const items = await getCart();
            const productsData: Artwork[] = [];

            // Fetch artwork details for each item in cart
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

            // Update state with fetched products
            setProducts(productsData);
            setLoading(false);
        };

        getCartItems();
    }, []);

    const renderItem = ({ item }: { item: Artwork }) => {
        return (
            <StyledView classname='flex-1 flex-col '>
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
                        title='remove'
                        onPress={async () =>
                            await removeItemFromCart(item.artworkId)
                        }
                    />
                </StyledView>
            </StyledView>
        );
    };

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
                        keyExtractor={(item) => item.artworkId.toString()} // Adjust as per your artwork ID
                    />
                    <Button
                        title='Checkout'
                        onPress={() => openLink('https://facebook.com')}
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
