// Handling Push Notfication
self.addEventListener('push', function (event) {
    const message = event.data.json();
    message.actions = [{
            action: "book_room",
            title: 'Book Now!',
            icon: 'assets/icons/ok.png'
    },
    {
        action: "no",
        title: 'Cancel',
        icon: 'assets/icons/close.png'
    }
    ];

    event.waitUntil(self.registration.showNotification("New Room Avialable!", message));
});

// Handlling a notifcation action
self.addEventListener('notificationclick', function (event) {
    const data = event.notification.data;

    event.notification.close();
    if (event.action === "book_room") {
        clients.openWindow("/?roomId=" + data.roomId);
    }
});
