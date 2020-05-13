
const firebaseConfig = {
    apiKey: "AIzaSyBz83kqwVu8gWrGAjkitG3sh5VtbWfbG2U",
    authDomain: "stock-a30ff.firebaseapp.com",
    databaseURL: "https://stock-a30ff.firebaseio.com",
    projectId: "stock-a30ff",
    storageBucket: "stock-a30ff.appspot.com",
    messagingSenderId: "628920247502",
    appId: "1:628920247502:web:93439270d44745fc435c9f"
}

firebase.initializeApp(firebaseConfig) 

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin")
const loginLogic = document.getElementById("loginLogic")
const errorCheck = document.getElementById("error-check")
const emailCheck = document.getElementById("email-check")
const accountLogic = document.getElementById("accountLogic")

const database = firebase.database()
let rootRef = database.ref()

let auth = firebase.auth()


btnLogin.addEventListener('click', (e) => {
    const email = txtEmail.value
    const pass = txtPassword.value
    logIn(email, pass)
})

function logIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('successfully logged in')
            accountLogic.innerHTML = "Successfully logged in"
            window.setInterval(() => window.location.href = "product.html", 2000)
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code, error.message)
            if ((/(email)+/g).test(errorMessage)) {
                console.log("email error")
                console.log(errorMessage)
                txtEmail.className += " is-invalid"
                emailCheck.className = "invalid-feedback"
                errorCheck.innerHTML = error.message
            }
            else {
                console.log(error.code + error.message)
                txtPassword.className += " is-invalid"
                errorCheck.className = "invalid-feedback"
                errorCheck.innerHTML = error.message
            }
        })
}
