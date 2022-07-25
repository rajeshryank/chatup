const usernameEl = document.getElementById('username-el')
usernameEl.addEventListener("keyup", usernameValidation)
const passwordEl = document.getElementById('password-el')
passwordEl.addEventListener("keyup", passwordValidation)

let specialChar = /[-.!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/
function usernameValidation() {
    let usernameErrEl = document.getElementById("username-error")
    let username = usernameEl.value
    if(username.length > 4){
        if(username.search(specialChar) == -1) {
            usernameErrEl.innerText = ""} 
        else{usernameErrEl.innerText = "invalid special characters"}
    }else{
        usernameErrEl.innerText = "min 5 characters required"}
}
function passwordValidation(){
    let passwordErrEl = document.getElementById("password-error")
    let password = passwordEl.value
    if(password.length < 7) {
        passwordErrEl.innerText = "minimum seven letters required"
    }else { passwordErrEl.innerText = ""}
}


















//     if (_name=="") {
//         document.getElementById('names').innerHTML = " Name required "
//         return false
//     }
//     else if(_name.length <=2) {
//         document.getElementById('names').innerHTML = " min 2 characters required "
//         return false
//     }

//     if((username.length <=2 || username.)) {
//         document.getElementById('usernames').innerHTML = " min  characters required "
//         return false
//     }
//     else if(username.search(/[a-b]/) == -1) {
//         document.getElementById('usernames').innerHTML = " *lower character require"
//         return false
//     }
//     else if(username.search(/[\!\@\#\$\%\^\&\*\,\.]/) != -1) {
//         document.getElementById('usernames').innerHTML = "use underscore only"
//         return false
//     }

//     if (_email=="") {
//         document.getElementById('emails').innerHTML = " *required and must be a valid email"
//         return false
//     }
//     else if (_email.indexOf('@') <= 0) {
//         document.getElementById('emails').innerHTML = " *Invalid @ Position";
//         return false;                       /* it will not send to server*/ 
//     }
//     else if((_email.charAt(_email.length-4)!='.') && (_email.charAt(_email.length-3)!='.')){
//         document.getElementById('emails').innerHTML = " *Invalid . Position should be 3 or 4";
//         return false;
//     }

//     if (password=="") {
//         document.getElementById('pass').innerHTML = " *required and must be a valid email"
//         return false
//     }
//     else if((password.length <= 8) || (password.length > 16)) {
//         document.getElementById('pass').innerHTML = " *length should be > 8 and < 16 "
//         return false
//     }
//     else if(password.search(/[0-9]/) == -1) {
//         document.getElementById('pass').innerHTML = " *at least on number"
//         return false
//     }
//     else if(password.search(/[A-Z]/) == -1) {
//         document.getElementById('pass').innerHTML = " *at least on upper character"
//         return false
//     }
//     else if(password.search(/[a-b]/) == -1) {
//         document.getElementById('pass').innerHTML = " *at least on lower character"
//         return false
//     }
//     else if(password.search(/[\!\@\#\$\%\^\&\*\,\.]/) == -1) {
//         document.getElementById('pass').innerHTML = " *at least on special character"
//         return false
//     }


