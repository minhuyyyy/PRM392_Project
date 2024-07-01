import { StyleSheet } from 'react-native';

import ProductList from '@/components/products/product_list';
import Layout from '@/components/layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    return (
        <Layout>
            <ProductList />
        </Layout>
    );
}
