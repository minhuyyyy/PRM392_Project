import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const schedulePushNotification = async (artworkName: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Item Added to Cart',
      body: `${artworkName} has been added to your cart!`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notifications!');
      return null;
    }
    const projectId = Constants.manifest?.extra?.eas?.projectId || Constants.manifest2?.extra?.eas?.projectId;
    if (!projectId) {
      throw new Error('Project ID not found');
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } else {
    Alert.alert('Must use physical device for Push Notifications');
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};
