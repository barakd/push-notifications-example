# push-notifications-example
A push notifications example code, for my talk Push Notifications For The Masses

Slides: https://www.slideshare.net/barakdrechsler/push-notifications-for-the-masses
# How To Run the example locally?
1. run `npm i`
2. start the client server `npm start`
3. genertae public & private server keys for your push notifciations encryption `npm generate-keys` update `main.js` with your generated key.
4. create a firebase app, and get your firebase CLOUD MESSAGING server key.
5. run `npm start-server` and enter your keys when prompted.
6. in order to send your self a notification, send `post` request to `http://localhost:3000/push` with your message content.
