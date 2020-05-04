const firebaseConfig = {
    apiKey: "AIzaSyBz83kqwVu8gWrGAjkitG3sh5VtbWfbG2U",
    authDomain: "stock-a30ff.firebaseapp.com",
    databaseURL: "https://stock-a30ff.firebaseio.com",
    projectId: "stock-a30ff",
    storageBucket: "stock-a30ff.appspot.com",
    messagingSenderId: "628920247502",
    appId: "1:628920247502:web:93439270d44745fc435c9f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get elements
const txtEmail = document.getElementById("textEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

//Add login event
btnLogin.addEventListener("click", e => {
//Get email and pass
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = fireBase.auth();
//Sign in
const promise = auth.signInWithEmailAndPassword(email, pass);
promise.catch(e => console.log(e.message));
});

// Add signup event
btnSignUp.addEventListener("click", e => {
//Get email and pass
// TODO: CHECK 4 REAL EMAILZ
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = fireBase.auth();
//Sign in
const promise = auth.signInWithEmailAndPassword(email, pass);
promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener("click", e => {
firebase.auth().signOut();
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(fiebaseUser => {
if(firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove("hide");
} else {
    console.log("not logged in");
    btnLogout.classList.add("hide");
}
});