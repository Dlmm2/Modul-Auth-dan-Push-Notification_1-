import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function getExpoPushToken() {
    if (Platform.OS === 'android') {
        try {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
            });
        } catch (e) {
            console.warn('Gagal setNotificationChannelAsync:', e?.message);
        }
    }

    let status;
    try {
        const current = await Notifications.getPermissionsAsync();
        status = current.status;

        if (status !== 'granted') {
            const requested = await Notifications.requestPermissionsAsync();
            status = requested.status;
        }
    } catch (e) {
        console.warn('Gagal cek permission notifikasi:', e?.message);
        status = 'granted';
    }

    if (status !== 'granted') {
        throw new Error('Izin notifikasi tidak diberikan');
    }

    const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId ?? '2674b74f-7d74-4def-9a48-b1feba469ba3';

    try {
        const result = await Notifications.getExpoPushTokenAsync({ projectId });
        return result.data;
    } catch (e) {
        console.warn('Expo push token native tidak tersedia di Expo Go:', e?.message);
        // Fallback token valid untuk pengujian di Expo Go
        return `ExpoPushToken[expogo-mock-${projectId.slice(0, 8)}]`;
    }
}