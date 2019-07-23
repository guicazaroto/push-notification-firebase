self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow('https://fb.com'));
});

importScripts('https://www.gstatic.com/firebasejs/5.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyC8gBAHVqDfiRcd5zDHruBYLuHqJ_rNnnA",
    authDomain: "webpush-local.firebaseapp.com",
    databaseURL: "https://webpush-local.firebaseio.com",
    projectId: "webpush-local",
    storageBucket: "webpush-local.appspot.com",
    messagingSenderId: "218308799088"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function (payload) {
    var notificationBody = payload.data.body;
    var reducedBody;
    if (notificationBody.length > 38) {
        reducedBody = notificationBody.substring(0, 38) + "..."
    }
    const options = {
        data  : 
        {
            caminho: payload.data.caminho
        },
        body: reducedBody,
        icon: '/Content/css/img/pushicon.png'
    }
    return self.registration.showNotification(payload.data.titulo, options);
});