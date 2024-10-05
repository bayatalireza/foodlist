import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCbWDjNd5HjkpEght4ekn-ILlw0CAWVP4",
    authDomain: "foodlist-site.firebaseapp.com",
    projectId: "foodlist-site",
    storageBucket: "foodlist-site.appspot.com",
    messagingSenderId: "27394026175",
    appId: "1:27394026175:web:2f2acee4697920ff10f40a"
  };

// init firebase

initializeApp(firebaseConfig)

// init firestore

const db = getFirestore()

export { db }