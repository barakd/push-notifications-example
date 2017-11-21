const $button = $('#subscribe-btn');

registerServiceWorker();

function registerServiceWorker() {
  // $reg
}

function setUpButton(serviceWorkerReg) {
  // $setupbtn
}


function subscribeUser(registration) {
  // $task 

}

function askPermession() {
 // $ask
}

function saveSubscription(pushSubscription) {
// $savesub
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

