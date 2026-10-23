// services/api.js
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
    const contentType = res.headers.get('content-type') || '';
    let data = null;
    if (res.status !== 204) {
        if (contentType.includes('application/json')) {
            data = await res.json();
        } else {
            const rawText = await res.text();
            data = { pesan: rawText };
        }
    }
    if (!res.ok) {
        throw new Error(data?.pesan || 'Request gagal');
    }
    return data;
}