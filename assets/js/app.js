
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
firebase.initializeApp(config);

// Get elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const txtName = document.getElementById("txtName")
const txtPhone = document.getElementById("txtPhone")
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

const database = firebase.database()
let rootRef = database.ref()

let auth = firebase.auth()

rootRef.on('value', (snapshot) => {
    snapshotValue = snapshot.val()
    console.log(snapshotValue)
})


// btnLogin.addEventListener('click', e => {
//     const email = txtEmail.value
//     const pass = txtPassword.value
//     logIn(email, pass)
// })

btnSignup.addEventListener('click', e => {
    const email = txtEmail.value
    const pass = txtPassword.value
    const name = txtName.value
    signUp(email, pass, name)
})

googleSignInButton.addEventListener('click', e => {
    signInGoogle()
    console.log('google clicked')
})

phoneSignInButton.addEventListener('click', e => {
    numberLogin(phone.value)
    console.log('phone clicked')
})

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut()
})

// Add a realtime listener
firebase.auth().onAuthStateChanged(fiebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove("hide");
    } else {
        console.log("not logged in");
        btnLogout.classList.add("hide");
    }
});

function logIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
            let emailKey = email.substr(0, email.indexOf("@"))
            firebase.database().ref("users/" + emailKey).set({
                email: email,
                password: password,
                name: 'anon'
            })
            alert("User succesfully logged in")
        })
        .catch(function (error) {
            alert("User cannot login")
            console.log(error)
        })
}

function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password, name)
        .then(function (user) {
            let emailKey = email.substr(0, email.indexOf("@"))
            firebase.database().ref("users/" + emailKey).set({
                email: email,
                password: password,
                name: name
            })
            alert("User Account Created")
        })
        .catch(function (error) {
            alert("User cannot be created")
            errorPre.innerHTML = (error.message)
            console.log(error.message)
        })
}
function logout() {
    firebase.auth().signOut()
        .then(function () {
            alert("user signed out")
        })
        .catch(function (error) {
            alert("Something went wrong")
        })
}

function updateProfile() {
    let user = firebase.auth().currentUser
    if (user != null) {
        user.updateProfile({
            displayName: "Updated Name"
        })
        user.updateEmail("test@update.com").then(function () {
            alert("Email Updated")
        }).catch(function (error) {
            alert("email not updated")
        })
    } else {
        alert("There is no user!")
    }
}

function verifyUser() {
    let user = firebase.auth().currentUser
    user.sendEmailVerification().then(function () {
        alert("Email sent!")
    }).catch("Email not sent!")
}

function deleteUser() {
    let user = firebase.auth().currentUser
    user.delete().then(function () {
        alert("user deleted!")
    }).catch(function (error) {
        alert("User not deleted!")
    })
}

function resetPassword() {
    let user = firebase.auth().currentUser
    firebase.auth().sendPasswordResetEmail(user.email).then(function () {
        alert("Email sent!")
    }).catch("Email not sent!")
}

function signInGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            alert("User authenticated")
            let user = result.user
            console.log("User ====== ", user)
        })
        .catch(function (error) {
            alert("Authentication failed!")
        })
}

function anonymousLogin() {
    firebase.auth().signInAnonymously().then(function () {
        alert("OK")
    }).catch(function (error) {
        alert("something is wrong!")
    })
}

function numberLogin(phoneNumber) {
    console.log("numberLogin called!")
    let appVerifier = new firebase.auth.RecaptchaVerifier('todo: add recaptcha div')

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            let code = window.prompt("please, enter the 6 digit code!")
            return confirmationResult.confirm(code)
        }).then((result) => {
            document.getElementById('todo: recaptcha div').innerHTML = "Authenticated"
        }).catch((error) => {
            console.log("Error ======= ", error)
            document.getElementById('todo: recaptcha div').innerHTML = "Not Authenticated"
        })
}