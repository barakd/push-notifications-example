self.addEventListener('push', function (event) {
    const message = event.data.json();
        message.actions = [{
                action: "buy_coat",
                title: 'Buy Now!',
        },
        {
            action: "no",
            title: 'Cancel',
        }
        ];
    
    event.waitUntil(self.registration.showNotification(message.title, message));
});


// Handlling a notifcation action
self.addEventListener('notificationclick', function (event) {
    const data = event.notification.data;

    event.notification.close();
    if (event.action === "buy_coat") {
        clients.openWindow("/?coatId=" + data.coatId);
    }
});