const firebase = require('firebase/app');
require('firebase/database');

var firebaseConfig = {
  apiKey: "AIzaSyC5K7_lECihYSGPy3jLCzbtt7j84uNjb5s",
  authDomain: "ciudadania-digital-8bd13.firebaseapp.com",
  databaseURL: "https://ciudadania-digital-8bd13.firebaseio.com",
  projectId: "ciudadania-digital-8bd13",
  storageBucket: "ciudadania-digital-8bd13.appspot.com",
  messagingSenderId: "92895881427",
  appId: "1:92895881427:web:10215badc846fca04ccc26",
  measurementId: "G-2QVFTPP718"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
