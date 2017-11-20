const $button = $('#subscribe-btn');
const PUBLIC_API_KEY = urlBase64ToUint8Array('BClV-KeO_EQjxTtEibwfs6jCoIitFXo-MX-lyfK5Q2tOch5-cNIEAKcDpHpUaKQGJUwCRIv8bKQIcfqzExRDLfQ');
let serviceWorkerRegisteration;

registerServiceWorker();

function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => serviceWorkerRegisteration = reg)
      .then(setUpButton)
  }
}

function setUpButton(serviceWorkerReg) {
  $button.removeClass('disabled');
  $button.click( () => subscribeUser(serviceWorkerReg));
}


function subscribeUser(registration) {
 $button.addClass('disabled');
  return askPermession().then(() => {
    const subscribeOptions = {
      userVisibleOnly: true, // MUST true always
      applicationServerKey: PUBLIC_API_KEY,
    };
    return registration.pushManager
      .subscribe(subscribeOptions)
      .then(saveSubscription);
  }).finally(() => $button.removeClass('disabled'));
}

function askPermession() {
  return new Promise((resolve, reject) => {
    const promiseResult = Notification.requestPermission(result => resolve(result))
    if (promiseResult)
      promiseResult.then(resolve, reject);
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

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

