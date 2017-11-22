const $button = $('#subscribe-btn');
// Replace here with your server public key
const PUBLIC_API_KEY = urlBase64ToUint8Array('your server public key');

registerServiceWorker();

function registerServiceWorker() {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.register('/sw.js')
        .then(setUpButton)
    } else {
      $button.text('Your Browser dosent support Push');
    }
}

function setUpButton(serviceWorkerReg) {
    enableButton();
    $button.click( () => subscribeUser(serviceWorkerReg));
}


function subscribeUser(registration) {
    return askPermession().then(() => {
         const subscribeOptions = {
            userVisibleOnly: true, // MUST true always
            applicationServerKey: PUBLIC_API_KEY,
          };
          return registration.pushManager
            .subscribe(subscribeOptions)
            .then(saveSubscription);
    })

}

function askPermession() {
  return new Promise((resolve, reject) => {
     const returnedPromise = Notification.requestPermission(result => resolve(result))
     if (returnedPromise)
       returnedPromise.then(resolve, reject);
   }).then(result => {
     if (result !== 'granted') {
       throw new Error('no permession');
     }
   });
}

function saveSubscription(pushSubscription) {
  console.log('Saving PushSubscription: ', JSON.stringify(pushSubscription));  
  return fetch('http://localhost:3000/subscribe/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pushSubscription)
  });
}

function enableButton() {
  $button.removeClass('disabled');
  $button.prop('disabled', false);
}

function disableButton() {
  $button.addClass('disabled');
  $button.prop('disabled', true);
}

function userNotAllowed(error) {
  disableButton();
  $button.text('You didn\'t allow Notifications');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

