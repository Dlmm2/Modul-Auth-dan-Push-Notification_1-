import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';

export default function ProfileScreen() {
    const auth = useAuth() || {};
    const { token } = auth;
    const [profile, setProfile] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (token) {
            getMe(token)
                .then((data) => {
                    setProfile(data);
                })
                .catch((err) => {
                    console.error("Gagal fetch profil:", err);
                    setErrorMsg(err.message || "Terjadi kesalahan saat memuat profil");
                });
        }
    }, [token]);

    // Jika terjadi error, tampilkan pesan errornya di layar supaya jelas
    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                    Gagal Memuat Profil:
                </Text>
                <Text style={{ textAlign: 'center', marginBottom: 16, color: '#333' }}>
                    {errorMsg}
                </Text>
                <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
                    Tip: Coba Logout lalu Login ulang untuk memperbarui token Anda.
                </Text>
            </View>
        );
    }

    // Tampilkan loading jika belum ada data profil
    if (!token || !profile) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil Pengguna</Text>
            <Text>Nama: {profile.nama}</Text>
            <Text>Email: {profile.email}</Text>
            <Text>ID: {profile.id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, gap: 10, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 }
});