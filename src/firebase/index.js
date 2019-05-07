import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCHPKuaHB4n-hkd9WS9UvR39Orp3H2PheE",
  authDomain: "mse-matchmaker.firebaseapp.com",
  databaseURL: "https://mse-matchmaker.firebaseio.com",
  projectId: "mse-matchmaker",
  storageBucket: "mse-matchmaker.appspot.com",
  messagingSenderId: "1065430660603"
};
firebase.initializeApp(config);

const storage = firebase.storage();
const database = firebase.database();

export { storage, database, firebase as default };
