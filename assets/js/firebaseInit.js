let firebaseConfig = {
    apiKey: "AIzaSyBz83kqwVu8gWrGAjkitG3sh5VtbWfbG2U",
    authDomain: "stock-a30ff.firebaseapp.com",
    databaseURL: "https://stock-a30ff.firebaseio.com",
    projectId: "stock-a30ff",
    storageBucket: "stock-a30ff.appspot.com",
    messagingSenderId: "628920247502",
    appId: "1:628920247502:web:93439270d44745fc435c9f"
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
let rootRef = database.ref()
let auth = firebase.auth()
const login = document.getElementById("login")
const signup = document.getElementById("signup")
const profile = document.getElementById("profile")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let currentUser = firebase.auth().currentUser;
        signup.classList.add("is-invisible")
        login.classList.add("is-invisible")
        profile.classList.remove("is-invisible")
    } else {
        // No user is signed in.
        console.log("no one is signed in")
    }
});