import Layout from '@/components/layout';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
    return (
        <Layout>
            <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 10.87539772915963,
                  longitude: 106.80072339507166,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 10.87539772915963,
                    longitude: 106.80072339507166,
                  }}
                  title="Nhà văn hóa sinh viên"
                  description="Nhà văn hóa sinh viên"
                />
                </MapView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });