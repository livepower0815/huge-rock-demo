import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

let firebaseConfig = {
  apiKey: "AIzaSyA51URP4GCaISanXYdhDolbTyWihmsdrcY",
  authDomain: "project-0815.firebaseapp.com",
  databaseURL: "https://project-0815.firebaseio.com",
  projectId: "project-0815",
  storageBucket: "project-0815.appspot.com",
  messagingSenderId: "982301188795",
  appId: "1:982301188795:web:a01819d130b38a38"
}

firebase.initializeApp(firebaseConfig)

let db = firebase.database()
let storage = firebase.storage()

export {db, storage}