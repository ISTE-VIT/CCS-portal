// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyCSDjvbVuKjxgGhy5IHMJ57JLYDBK_CPOM',
  authDomain: 'iste-ccs.firebaseapp.com',
  projectId: 'iste-ccs',
  storageBucket: 'iste-ccs.appspot.com',
  messagingSenderId: '242181644647',
  appId: '1:242181644647:web:c29308154c207cec048fc2',
  measurementId: 'G-5FG2Y61BM5',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
var db = firebase.firestore()
var auth = firebase.auth()
