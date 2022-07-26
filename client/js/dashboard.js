import {
  removeFocusClass,
  keepFocused,
  logOut,
} from "./dashboardFunctions/helperfunctions.js";
import {
  addMessageDiv,
  getMessages,
  insertAbout,
} from "./dashboardFunctions/messageFunctions.js";
import {
  getUsers,
  currUserProfile,
} from "./dashboardFunctions/userfunctions.js";
import {
  getFromCookie,
  scrollDown,
} from "./dashboardFunctions/helperfunctions.js";
import { recievedMessage } from "./dashboardFunctions/templates.js";
export const socket = io();

function onClickUser(event) {
  keepFocused(event);
  //visible chat elements
  document.getElementById("intro-header").style = "visibility:hidden";
  let chatContainer = document.getElementById("chat-container")
  chatContainer.style.visibility = "visible"

  //reciever's username and Id
  let messageContainer = document.getElementById("text-messages-container");
  let recieverUserName =
    event.target.parentElement.lastElementChild.lastElementChild.innerText;
    recieverUserName = recieverUserName.slice(1);
  let receieverId = localStorage.getItem(recieverUserName);
  messageContainer.classList = receieverId

  //reciever's name
  let recieverName =  event.target.innerText
  let selectedUserNameHeaderEl = document.getElementById("selected-user-name-header")
  selectedUserNameHeaderEl.innerText = recieverName

  getMessages(event,receieverId);
}

socket.on("newMessage", (data) => {
  console.log("recieved message:", data);
  let senderEl = document.getElementsByClassName(data.senderId)[0];
  console.log(data.message);
  senderEl.innerHTML += recievedMessage(data.message, "12:41");
  scrollDown();
});

async function main() {
  await getUsers();
  socket.emit("login", { loggedInId: localStorage.getItem("currUser") });
  currUserProfile(event);
  // handle click on the recievers
  let usersArray = document.getElementsByClassName("name");
  for (let i = 0; i < usersArray.length; i++) {
    usersArray[i].addEventListener("click", onClickUser);
  }
  // add message bubble onsending message
  let sendbtnEl = document.getElementById("send-button");
  sendbtnEl.addEventListener("click", addMessageDiv);
  //handle click on brandname
  let brandel = document.getElementById("brand-name");
  brandel.addEventListener("click", currUserProfile);
  //logout
  let logoutEl = document.getElementsByClassName("log-out-icon")[0];
  logoutEl.addEventListener("click", logOut);
}
main();
