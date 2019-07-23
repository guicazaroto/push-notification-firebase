// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDzVI9Daq51oIJRNtZMwO1BFNI7tQFcQDg",
  authDomain: "push-4af90.firebaseapp.com",
  databaseURL: "https://push-4af90.firebaseio.com",
  projectId: "push-4af90",
  storageBucket: "",
  messagingSenderId: "222575797538",
  appId: "1:222575797538:web:e0c90f1701dd0eb2"
};

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function (registration) {               
        messaging.useServiceWorker(registration);
  
        messaging.requestPermission()
            .then(function(){
                console.log('Permissão concedida.');
                return messaging.getToken();
            })
            .then(function(token){
                console.log(token);               
            })
            .catch(function(erro){
                console.log('Permissão rejeitada', erro)
            });
    
    });
    
    //função para deletar tokens
    function deleteToken() {
        messaging.getToken().then(function(currentToken) {
          messaging.deleteToken(currentToken).then(function() {
            console.log('Token deleted.');
            
          }).catch(function(err) {
            console.log('Unable to delete token. ', err);
          });
          // [END delete_token]
        }).catch(function(err) {
          console.log('Error retrieving Instance ID token. ', err);
        });
      }


    function payloadNotification(payload) {
        console.log(payload);
        if (!document.hidden) {
            var notificationBody = payload.notification.body;
            var reducedBody;
            if (notificationBody.length > 38) {
                reducedBody = notificationBody.substring(0, 38) + "..."
            }
            var notify = new Notification(payload.notification.title, {
                body: reducedBody,
                icon: '/Content/css/img/pushicon.png'
            });
            notify.onclick = function () {
                notify.close();
                window.open(payload.data.link);
            }
        }

    }

    messaging.onMessage(function (payload) {
        //console.log(payload);
        payloadNotification(payload);
    });

   document.querySelector('.btn').addEventListener('click', deleteToken);     

  
  