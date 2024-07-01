import React, { useEffect, useState } from 'react';
import {
    StyledImage,
    StyledPressable,
    StyledText,
    StyledView,
} from '../styled.tsx';
import { axiosInstance } from '@/axios/index';
import { Artwork } from '@/contracts/types/Artwork';
import { FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Loading from '../loading/loading';

export default function ProductList() {
    const [loading, setLoading] = useState(true); // Correct state setter name
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            const res = await axiosInstance.get('/artwork');
            setProducts(res.data.items);
            setLoading(false); // Correct state setter name
        };
        fetchArtworks();
    }, []);

    const renderItem = ({ item }: { item: Artwork }) => {
        return (
            <StyledView classname='flex-1/2 w-1/2 ml-2 bg-white mb-2'>
                <Link
                    href={{
                        pathname: '(screens)/artwork/[id]',
                        params: { id: item.artworkId },
                    }}
                >
                    <StyledPressable onPress={() => console.log('Pressed')}>
                        <StyledImage
                            height={100}
                            width={100}
                            src={item.image}
                            classname='w-24 h-24'
                            resizeMode='contain'
                            alt=''
                        />
                        <StyledText text={item.name} />
                        <StyledText
                            text={item.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        />
                    </StyledPressable>
                </Link>
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
                <FlatList
                    style={styles.container}
                    data={products}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.artworkId.toString()}
                />
            )}
        </StyledView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});
