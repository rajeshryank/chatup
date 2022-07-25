
export function removeFocusClass () {
    let nameFocus = document.getElementsByClassName("name-focus-class")
    if(nameFocus.length > 0) {
        nameFocus[0].classList.remove("name-focus-class")
    }
    let userLineFocus = document.getElementsByClassName("user-line-focus-class")
    if (userLineFocus.length >0) {
        userLineFocus[0].classList.remove("user-line-focus-class")
    }
    let arrowEl = document.getElementsByClassName("fa-circle-arrow-right")
    if (arrowEl.length>=1) {
        arrowEl[0].classList = "user-icon fa-solid fa-user"
    }
}
export function scrollDown() {
    let textMessagesContainerEl = document.getElementById(
      "text-messages-container"
    );
    textMessagesContainerEl.scrollTop = textMessagesContainerEl.scrollHeight;
  }

export  function getFromCookie(name) {
    return (
      document.cookie
        .match("(^|;)\\s*" + `${name}` + "\\s*=\\s*([^;]+)")
        ?.pop() || ""
    );
  }

//focus the clicked user  
export function keepFocused(event) {
  // remove focus classes for previous select
  removeFocusClass()
  //add arrow icon 
  let faEl = event.target.parentElement.parentElement.lastElementChild
  faEl.classList ="user-icon fa-solid fa-circle-arrow-right"

// add focus classes
  let userLine = event.target.parentElement.parentElement
  let nameEl = event.target.parentElement.firstElementChild
  nameEl.classList.toggle("name-focus-class")
  userLine.classList.toggle("user-line-focus-class")
}

// handle logout 
export const logOut = () => {
  document.cookie = "jwttoken=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  window.localStorage.clear();
  window.location.reload(true);
};
