const usernameEl = document.getElementById("username")
const passwordEl = document.getElementById("password")
const buttonEl = document.getElementById("submit-button")
async function  storeJwtToken(){
    const response = await fetch('/loginfetch', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: queryString.stringify({username:usernameEl.value , password:passwordEl.value})
      });
      const token = await response.json();
      localStorage.setItem({"token": token})
}
buttonEl.addEventListener('click', storeJwtToken)