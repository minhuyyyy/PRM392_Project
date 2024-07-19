import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Image,
} from 'react-native';
import { axiosInstance } from '@/axios';
import useUser from '@/app/hooks/useUser';

// Define the types for order details and artwork
interface OrderDetail {
    orderId: number;
    artworkId: number;
    unitPrice: number;
}

interface Order {
    orderId: number;
    buyerId: number;
    orderDate: string;
    totalAmount: number;
    totalQuantity: number;
    orderDetails: OrderDetail[];
}

interface Artwork {
    artworkId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    artistID: number;
    isPublic: boolean;
    isBuyAvailable: boolean;
    artworkRating: number;
    artworkDate: string;
    genreId: number;
    genreName: string | null;
    membersRated: number[];
}

const BoughtArtworkScreen = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [artworks, setArtworks] = useState<Record<number, Artwork>>({});

    const { user } = useUser();

    useEffect(() => {
        const fetchOrdersAndArtworks = async () => {
            try {
                const response = await axiosInstance.get(
                    `/order/buyer/${user.MemberId}`,
                );
                const ordersData: Order[] = response.data;
                setOrders(ordersData);

                // Fetch artwork details for each order detail
                const artworkPromises = ordersData.flatMap((order) =>
                    order.orderDetails.map(async (detail) => {
                        const artworkResponse = await axiosInstance.get(
                            `/artwork/${detail.artworkId}`,
                        );
                        return {
                            artworkId: detail.artworkId,
                            ...artworkResponse.data,
                        };
                    }),
                );

                const artworksData = await Promise.all(artworkPromises);
                const artworksMap = artworksData.reduce((acc, artwork) => {
                    acc[artwork.artworkId] = artwork;
                    return acc;
                }, {} as Record<number, Artwork>);

                setArtworks(artworksMap);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndArtworks();
    }, [user.MemberId]);

    if (loading) {
        return (
            <ActivityIndicator
                size='large'
                color='#0000ff'
                style={styles.loader}
            />
        );
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.orderId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>
                            {Number(item.totalAmount).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                        <FlatList
                            data={item.orderDetails}
                            keyExtractor={(detail) =>
                                detail.artworkId.toString()
                            }
                            renderItem={({ item: detail }) => {
                                const artwork = artworks[detail.artworkId];
                                if (!artwork) return null; // Skip if artwork data is not available
                                return (
                                    <View style={styles.artworkCard}>
                                        <Text style={styles.artworkTitle}>
                                            {artwork.name}
                                        </Text>
                                        <Text style={styles.artworkDescription}>
                                            {artwork.description}
                                        </Text>
                                        <Text style={styles.artworkPrice}>
                                            Price:{' '}
                                            {Number(
                                                detail.unitPrice,
                                            ).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Text>
                                        <Image
                                            source={{
                                                uri:
                                                    artwork.image ||
                                                    'https://via.placeholder.com/150',
                                            }}
                                            style={styles.image}
                                        />
                                    </View>
                                );
                            }}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: 20,
    },
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    artworkCard: {
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#e9e9e9',
        borderRadius: 8,
    },
    artworkTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    artworkDescription: {
        fontSize: 14,
        marginVertical: 4,
    },
    artworkPrice: {
        fontSize: 14,
        marginVertical: 4,
    },
    image: {
        width: '100%',
        height: 150,
        marginTop: 8,
        borderRadius: 8,
    },
});

export default BoughtArtworkScreen;
