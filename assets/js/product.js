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

const database = firebase.database()
let rootRef = database.ref()

let auth = firebase.auth()

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let currentUser = firebase.auth().currentUser;
        currentUser.email
        hideElements(currentUser)
    } else {
        // No user is signed in.
        console.log("no one is signed in")
    }
});

function hideElements(login, signup) {
    document.getElementById(login).style.display= "";
    document.getElementById(signup).style.visibility = "visible";
    console.log('hide Element fired')
};


// jquery option like this
$("#item").toggle();
$("#item").hide();
$("#item").show();
// For example:

$(document).ready(function () {
    $("#item").click(function (event) {
        //Your actions here
    });
});

// function hideElements(user){
//     console.log(user.email)
//     let hideElementLogin = document.getElementById("hide-element-login")
//     let hideElementRegister = document.getElementById("hide-element-register")
//     hideElementLogin.setAttribute("display", "none")
//     hideElementRegister.setAttribute("display", "none")
//     hideElementRegister.set
    
// }