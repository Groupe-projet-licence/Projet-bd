importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "LA_CLE_API",
  authDomain: "LE_DOMAINE.firebaseapp.com",
  projectId: "LE_PROJECT_ID",
  messagingSenderId: "LE_SENDER_ID",
  appId: "LE_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Notification reçue en arrière-plan', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
