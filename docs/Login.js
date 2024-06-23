var firebaseConfig = {
    apiKey: "AIzaSyDltGTA-EdEhd0QtJSto_bWvoF9T6N2aoY",
    authDomain: "budget-bites-account-handling.firebaseapp.com",
    databaseURL: "https://budget-bites-account-handling-default-rtdb.firebaseio.com",
    projectId: "budget-bites-account-handling",
    storageBucket: "budget-bites-account-handling.appspot.com",
    messagingSenderId: "265988483810",
    appId: "1:265988483810:web:dece5f6c4a5a73b9db4cbb"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initializing variables
const auth = firebase.auth()
const database = firebase.database()


// Register Function
function register() {
    // Gather all input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value


    // Validate input fields
    if (validate_email (email) == false || validate_password(password) == false) {
        alert('Email or Password is Incorrect')
        return
    }
    if (validate_field(full_name) == false) {
        alert('Name is  Incorrect')
        return
    }

    // Authorization
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser

        // Add the user to Firebase database
        var database_ref = database.ref()

        // Create user data
        var user_data = {
            email : email,
            full_name : full_name,
            confirm_password : confirm_password,
            last_login : Date.now()
        }

        // Push to Firebase database
        database_ref.child('users/' + user.uid).set(user_data)

        // Process completed
        alert('User Has Been Registered')
    })
    .catch(function(error) {
        // Firebase alert system
        var error_code = error.error_code
        var error_message = error.message

        alert(error_message, error_code)
    })

}



// Login Function
function login() {
    // Get all input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate inout fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password Incorrect')
        return
        // Do not continue if incorrect
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser

        // Add user to Firebase database
        var database_ref = database.ref()

        // Create user data
        var user_data = {
            last_login : Date.now()
        }

        // Send to Firebase database
        database_ref.child('users/' + user.uid).update(user_data)

        // Complete
        alert('User Has Logged In')
    })
    .catch(function(error) {
        // Firebase alert system
        var error_code = error.error_code
        var error_message = error.message

        alert(error_message, error_code)
    })
}



// Validate Functions

// Validating email can be used
function  validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

// Validating password can be used
function validate_password(password) {
    // Firebase only allows password that are greater than 6 characters
    if  (password < 6) {
        return false
    } else {
        return true
    }
}

// Validating other fields are filled in
function validate_field(field) {
    if (field == null)  {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}