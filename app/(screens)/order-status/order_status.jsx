import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { axiosInstance } from '@/axios';

const OrderStatusScreen = () => {
    const route = useRoute();
    const { orderId } = route.params;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [itemDetails, setItemDetails] = useState({});

    useEffect(() => {
        fetchOrderDetails(orderId);
    }, [orderId]);

    const fetchOrderDetails = async (orderId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/order/${orderId}`);
            setOrder(response.data);
            await fetchItemDetails(response.data.orderDetails);
        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchItemDetails = async (orderDetails) => {
        // const itemDetailsMap = {};
        // for (const item of orderDetails) {
        //     try {
        //         const itemResponse = await axiosInstance.get(
        //             `/artwork/${item.artworkId}`,
        //         );
        //         itemDetailsMap[item.artworkId] = itemResponse.data;
        //     } catch (error) {
        //         console.error('Error fetching item details:', error);
        //         itemDetailsMap[item.artworkId] = {
        //             error: 'Failed to load item details',
        //         };
        //     }
        // }
        // setItemDetails(itemDetailsMap);
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchOrderDetails(orderId).then(() => setIsRefreshing(false));
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator
                    size='large'
                    color='#e6417b'
                />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {order ? (
                <View style={styles.orderContainer}>
                    <Text style={styles.orderText}>
                        Order Number: {order.orderId}
                    </Text>
                    <Text style={styles.statusText}>
                        Payment Status: Completed
                    </Text>
                    <Text style={styles.statusText}>
                        Created At: {new Date(order.orderDate).toLocaleString()}
                    </Text>
                    <Text style={styles.subHeader}>Items:</Text>
                    {order.orderDetails.map((item, index) => (
                        <View
                            key={item.artworkId}
                            style={styles.itemContainer}
                        >
                            {itemDetails[item.artworkId] ? (
                                <View style={styles.itemDetailContainer}>
                                    {itemDetails[item.artworkId].error ? (
                                        <Text style={styles.errorText}>
                                            {itemDetails[item.artworkId].error}
                                        </Text>
                                    ) : (
                                        <>
                                            <Image
                                                source={{
                                                    uri: itemDetails[
                                                        item.artworkId
                                                    ].image,
                                                }}
                                                style={styles.itemImage}
                                            />
                                            <Text style={styles.itemDetailText}>
                                                Description:{' '}
                                                {
                                                    itemDetails[item.artworkId]
                                                        .description
                                                }
                                            </Text>
                                            <Text style={styles.itemDetailText}>
                                                Artist ID:{' '}
                                                {
                                                    itemDetails[item.artworkId]
                                                        .artistID
                                                }
                                            </Text>
                                            <Text style={styles.itemDetailText}>
                                                Genre:{' '}
                                                {
                                                    itemDetails[item.artworkId]
                                                        .genreName
                                                }
                                            </Text>
                                            <Text style={styles.itemDetailText}>
                                                Rating:{' '}
                                                {
                                                    itemDetails[item.artworkId]
                                                        .artworkRating
                                                }
                                            </Text>
                                            <Text style={styles.itemDetailText}>
                                                Date:{' '}
                                                {new Date(
                                                    itemDetails[
                                                        item.artworkId
                                                    ].artworkDate,
                                                ).toLocaleString()}
                                            </Text>
                                            <Text style={styles.itemDetailText}>
                                                Available for Purchase:{' '}
                                                {itemDetails[item.artworkId]
                                                    .isBuyAvailable
                                                    ? 'Yes'
                                                    : 'No'}
                                            </Text>
                                        </>
                                    )}
                                </View>
                            ) : (
                                <ActivityIndicator
                                    size='small'
                                    color='#e6417b'
                                />
                            )}
                        </View>
                    ))}
                    <Text style={styles.subTotalText}>
                        Subtotal: {toPrice(order.subTotal)}
                    </Text>
                </View>
            ) : (
                <View style={styles.orderContainer}>
                    <Text style={styles.errorText}>
                        Failed to load order details.
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};

const toPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        margin: 20,
    },
    orderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statusText: {
        fontSize: 16,
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
    },
    itemDetailContainer: {
        marginLeft: 20,
        marginTop: 5,
    },
    itemDetailText: {
        fontSize: 14,
    },
    itemImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    subTotalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default OrderStatusScreen;
