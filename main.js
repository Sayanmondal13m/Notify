const serverUrl = 'https://truth-coral-exhaust.glitch.me'; // Replace with your Glitch URL

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered.');

        // Request Notification Permission
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                // Subscribe to Push Notifications
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'YOUR_PUBLIC_KEY',
                }).then((subscription) => {
                    console.log('Subscribed to Push Notifications:', subscription);

                    // Send subscription to the server
                    fetch(`${serverUrl}/subscribe`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(subscription),
                    });
                });
            }
        });
    });
}

// Ring Button Click Handler
document.getElementById('ringButton').addEventListener('click', () => {
    fetch(`${serverUrl}/ring`, { method: 'POST' });
});