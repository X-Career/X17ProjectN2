import {initializeApp} from 'firebase/app' 
const firebaseConfig = {
    apiKey: "AIzaSyDTzS_Wvf9y0cZIUd_d5w3W4XKpXswWxew",
    authDomain: "projectn2-68dd7.firebaseapp.com",
    databaseURL: "https://projectn2-68dd7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectn2-68dd7",
    storageBucket: "projectn2-68dd7.appspot.com",
    messagingSenderId: "147423695477",
    appId: "1:147423695477:web:d3497544f18414af6c9e3c",
    measurementId: "G-EMGJSGJWKC"
}
const fbConfig = initializeApp(firebaseConfig);
export default fbConfig;