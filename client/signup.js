function validation() {

    var password = document.getElementById('password').value;






    // if (_email=="") {
    //     document.getElementById('emails').innerHTML = " *required and must be a valid email"
    //     return false
    // }
    // else if (_email.indexOf('@') <= 0) {
    //     document.getElementById('emails').innerHTML = " *Invalid @ Position";
    //     return false;                       /* it will not send to server*/ 
    // }
    // else if((_email.charAt(_email.length-4)!='.') && (_email.charAt(_email.length-3)!='.')){
    //     document.getElementById('emails').innerHTML = " *Invalid . Position should be 3 or 4";
    //     return false;
    // }


    // if (_first=="") {
    //     document.getElementById('first').innerHTML = " *first name required "
    //     return false
    // }
    // else if(_first.length <=2) {
    //     document.getElementById('first').innerHTML = " *required and min 2 characters "
    //     return false
    // }


    // if (last=="") {
    //     document.getElementById('last').innerHTML = " *last name required"
    //     return false
    // }
    // else if((last.length <=2)) {
    //     document.getElementById('last').innerHTML = " *required and min 2 characters "
    //     return false
    // }



    if (password=="") {
        document.getElementById('pass').innerHTML = " *required and must be a valid email"
        return false
    }
    else if((password.length <= 8) || (password.length > 16)) {
        document.getElementById('pass').innerHTML = " *length should be > 8 and < 16 "
        return false
    }
    else if(password.search(/[0-9]/) == -1) {
        document.getElementById('pass').innerHTML = " *at least on number"
        return false
    }
    else if(password.search(/[A-Z]/) == -1) {
        document.getElementById('pass').innerHTML = " *at least on upper character"
        return false
    }
    else if(password.search(/[a-b]/) == -1) {
        document.getElementById('pass').innerHTML = " *at least on lower character"
        return false
    }
    else if(password.search(/[\!\@\#\$\%\^\&\*\,\.]/) == -1) {
        document.getElementById('pass').innerHTML = " *at least on special character"
        return false
    }

}