const usernameEl = document.getElementById('username-el')
usernameEl.addEventListener("keyup", usernameValidation)
const passwordEl = document.getElementById('password-el')
passwordEl.addEventListener("keyup", passwordValidation)

let usernameSpecialChar = /[-.!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/
let nameSpecialChar = /[-_.!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/

function usernameValidation() {
    console.log("inside usernameValidation");
    let usernameErrEl = document.getElementById("username-error")
    let username = usernameEl.value
    if(username.length > 4 && username.length <=10){
        if(username.search(usernameSpecialChar) == -1) {
            usernameErrEl.innerText = ""
                return true} 
        else{usernameErrEl.innerText = "invalid special characters"}
        return true
    }else{
        usernameErrEl.innerText = "min five and max ten characters required"}
        return false
}
function passwordValidation(){
    console.log("inside password validation");
    let passwordErrEl = document.getElementById("password-error")
    let password = passwordEl.value
    if(password.length < 7) {
        passwordErrEl.innerText = "minimum seven characters required"
        return false
    }else{ 
        passwordErrEl.innerText = ""
        return true        
    }
}



function validateForm(){
    if (usernameValidation() && passwordValidation()) return true
    else return false
}