import { keepFocused, logOut,removeFocusClass } from "./dashboardFunctions/helperfunctions.js";
import {
  addMessageDiv,
  getMessages,
} from "./dashboardFunctions/messageFunctions.js";

import {
  getUsers,insertAbout
} from "./dashboardFunctions/userfunctions.js";

import { scrollDown, getFromCookie } from "./dashboardFunctions/helperfunctions.js";
import { recievedMessage } from "./dashboardFunctions/templates.js";
export const socket = io();

function onClickUser(event) {
    keepFocused(event);

  //visible chat elements
  document.getElementById("intro-header").style = "visibility:hidden";
  let chatContainer = document.getElementById("chat-container");
  chatContainer.style.visibility = "visible";

  //reciever's username and Id and set recieverId as class of text-messages-container el
  let messageContainer = document.getElementById("text-messages-container");
  let recieverUserName =
    event.target.parentElement.lastElementChild.lastElementChild.innerText;
  recieverUserName = recieverUserName.slice(1);
  let receieverId = localStorage.getItem(recieverUserName);
  messageContainer.classList = receieverId;

  // emit userOnlieStatusReq -> receiver online or not
  console.log("recieverID", receieverId );
  socket.emit("userOnlineStatusReq", {userId:receieverId})
  socket.on("userOnlineStatusRes", (data)=>{
    let userOnline = data.isOnline
    if(!userOnline) {
      console.log("useronline", userOnline);
    document.getElementById("userOnlineStatus").classList.remove("online-user")}
    else {document.getElementById("userOnlineStatus").classList.add("online-user")}
  })

  //set receiver's name
  let recieverName = event.target.innerText;
  let selectedUserNameHeaderEl = document.getElementById(
    "selected-user-name-header"
  );
  selectedUserNameHeaderEl.innerText = recieverName;
  
    // get messages of curruser and receiver
     getMessages(receieverId);
}

//capture newMessage event
socket.on("newMessage", (data) => {
  console.log("recieved message:", data);
  //using the classname of recieverId added 
  let senderEl = document.getElementsByClassName(data.senderId)[0];
  let sentTime = new Date();
  senderEl.innerHTML += recievedMessage(data.message, sentTime);
  scrollDown();
});
//capture userLeft event 
socket.on("userLeft", (data)=>{
    let userIdOfUserLeft = data.userId
    document.getElementById("userOnlineStatus").classList.remove("online-user")
    let userLeftEl = document.getElementsByClassName(`${userIdOfUserLeft}`)[0]
    if(userLeftEl){
      userLeftEl.classList.remove(`${userIdOfUserLeft}`)
    }
})
// // capture userOnline event 
// socket.on("newUserOnline", (data)=>{

//   document.getElementById("userOnlineStatus").classList.add("online-user")
// })

// add curr user prof info
export async function loadDashboard() {

  document.getElementById("intro-header").style = "visibility:visible";
  let chatContainer = document.getElementById("chat-container");
  chatContainer.style = "visibility:hidden";
  
  await insertAbout(getFromCookie("currUserId"), true);

  let profileInfo = document.getElementById("profile-name");
  profileInfo.innerText = "My Profile";
  // remove focus classes for previously selcted user list el if clicked before
  removeFocusClass();
}

async function main() {
  await getUsers();
  // emitlogin event 
  socket.emit("login", { currUserId: getFromCookie("currUserId") });

  // get loggedinuser's profile
  loadDashboard();

  // handle click on the reciever names
  let usersArray = document.getElementsByClassName("name");
  for (let i = 0; i < usersArray.length; i++) {
    usersArray[i].addEventListener("click", onClickUser);
  }

  // handle click event on send-button
  let sendbtnEl = document.getElementById("send-button");
  sendbtnEl.addEventListener("click", addMessageDiv);

  //handle click on brandname
  let brandel = document.getElementById("brand-name");
  brandel.addEventListener("click", loadDashboard);

  //logout
  let logoutEl = document.getElementsByClassName("log-out-icon")[0];
  logoutEl.addEventListener("click", logOut);
}
main();
