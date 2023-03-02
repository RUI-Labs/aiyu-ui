import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from "firebase/messaging";

export const useFirebaseStore = defineStore('firebase', () => {

const firebaseConfig = {
    apiKey: "AIzaSyCRkkoqcWKN0dvn1Dq_bLL2lVyGFp5qBeE",
    authDomain: "ruilabs.firebaseapp.com",
    projectId: "ruilabs",
    storageBucket: "ruilabs.appspot.com",
    messagingSenderId: "1068033572221",
    appId: "1:1068033572221:web:3a413ed5d8722eb3fca014"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  notifyMe()

getToken(messaging, { vapidKey: 'BMN2-8zjli2wWlyWTsDAl8emeTjZmJz-9TvwXtHU3fTqaJh4aNgTEZKyG9yodZrqvBU029pRMpwPpAdQQ4WSv4c' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      alert(currentToken)
      console.log(currentToken)
      // ...
    } else {
      // Show permission request UI
      alert('No registration token available. Request permission to generate one.')
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    alert(JSON.stringify(err))
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });


onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});



  return { app }
})
