import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBTApSit7Mifa6zImWXcWuEhCnGDwwX7xQ",
  authDomain: "instagram-48db5.firebaseapp.com",
  databaseURL: "https://instagram-48db5-default-rtdb.firebaseio.com",
  projectId: "instagram-48db5",
  storageBucket: "instagram-48db5.appspot.com",
  messagingSenderId: "300992496882",
  appId: "1:300992496882:web:ca9eec38f5061f6234bc6b",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
