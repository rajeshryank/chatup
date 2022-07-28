const usernameEl = document.getElementById("username-el")
usernameEl.addEventListener("keyup", usernameValidation)

const passwordEl = document.getElementById('password-el')
passwordEl.addEventListener("keyup", passwordValidation)

const nameEl = document.getElementById("name-el")
nameEl.addEventListener("keyup", nameValidation)

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
    }else if (password.search(nameSpecialChar) == -1){
        passwordErrEl.innerText = "use atleast one special character"
        return false
    }else{ 
        passwordErrEl.innerText = ""
        return true        
    }
}
function nameValidation(){
    let nameErrEl = document.getElementById("name-error")
    let name = nameEl.value 
    if(name.length < 4 ){
        nameErrEl.innerText = "min four characters required"
        return false
    } else if(name.length > 10 ){
        nameErrEl.innerText = "max 10 characters allowed"
        return false
    } else if(name.search(nameSpecialChar) != -1){
        nameErrEl.innerText = "No special characters allowed"
        return false
    }
    else{
        nameErrEl.innerText =""
        return true
    }   
}

function validateForm(){
    if (usernameValidation() && passwordValidation() && nameValidation()) return true
    else return false
}