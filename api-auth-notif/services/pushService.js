export async function kirimExpoPush(expoPushToken, pesan) {
    try {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: expoPushToken,
                sound: 'default',
                title: pesan.title,
                body: pesan.body,
                data: pesan.data || {},
            }),
        });
        const contentType = response.headers.get('content-type') || '';
        const result = contentType.includes('application/json') ? await response.json() : { data: await response.text() };
        return result;
    } catch (e) {
        console.error('Gagal kirimExpoPush:', e.message);
        return { status: 'error', message: e.message };
    }
}