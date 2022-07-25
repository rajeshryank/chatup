import {removeFocusClass, keepFocused, logOut} from "./dashboardFunctions/helperfunctions.js"
import { addMessageDiv, getMessages, insertAbout} from "./dashboardFunctions/messageFunctions.js"
import { getUsers, currUserProfile} from "./dashboardFunctions/userfunctions.js"
import { getFromCookie, scrollDown } from "./dashboardFunctions/helperfunctions.js"
import { recievedMessage } from "./dashboardFunctions/templates.js"
export const socket = io()

async function onClickUser(event){
  keepFocused(event)
  await getMessages(event)
  document.getElementById("intro-header").style = "visibility:hidden"
  let messageContainer = document.getElementById("text-messages-container")
  console.log(messageContainer);
  let userName = event.target.parentElement.lastElementChild.lastElementChild.innerText;
  userName = userName.slice(1)
  console.log(userName);
  messageContainer.classList = localStorage.getItem(userName)
}
async function main() {
  await getUsers();
  socket.emit("login", {loggedInId:localStorage.getItem("currUser")})
  await currUserProfile(event)

  socket.on("newMessage", (data)=>{
    console.log("recieved message:",data)
    let senderEl = document.getElementsByClassName(data.senderId)[0]
    console.log(data.message);
    senderEl.innerHTML += recievedMessage(data.message, "12:41")})
    scrollDown()

  // handle click on the user-
  let usersArray = document.getElementsByClassName("name");
  for (let i = 0; i < usersArray.length; i++) {
      usersArray[i].addEventListener("click", onClickUser);
  }
  // add message bubble onsending message
  let sendbtnEl = document.getElementById("send-button");
  sendbtnEl.addEventListener("click", addMessageDiv);
  //handle click on brandname
  let brandel = document.getElementById("brand-name")
  brandel.addEventListener("click", currUserProfile)
  //logout
  let logoutEl = document.getElementsByClassName("log-out-icon")[0]
  logoutEl.addEventListener("click", logOut)
}
main()
