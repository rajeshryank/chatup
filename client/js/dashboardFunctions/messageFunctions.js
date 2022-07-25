import { scrollDown, getFromCookie } from "./helperfunctions.js";
import {aboutUserTemplate,sentMessage,recievedMessage} from "./templates.js"
import { socket } from "../dashboard.js";

// upload message to DB with convoId, senderId and textData 
export function updateMessageDb(textData){
    let senderId = localStorage.getItem("currUser")
    let conversationId = localStorage.getItem("conversationId")
    console.log(conversationId)
    fetch("/message", {
        method: 'POST',
      headers: {
        jwttoken : getFromCookie("jwttoken"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({senderId: senderId,
                     conversationId:conversationId,
                    textData: textData})});
}

// socket event "privateMessage"
function triggerprivateMessage(message){
    //get reciever's MomgoId
    let recieverUserEl = document.getElementsByClassName("name-focus-class")[0]
    let recieverUserName = recieverUserEl.parentElement.lastElementChild.innerText
    recieverUserName = recieverUserName.slice(1);
    let recieverMongoId = localStorage.getItem(recieverUserName)
    console.log("recieverMongoId",recieverMongoId);
    //emit message 
    socket.emit("privateMessage", 
       {message:message, 
        recieverMongoId:recieverMongoId})
}

// take value from input box and add it to textMessagesContainerEl
export function addMessageDiv(event) {

  event.preventDefault();
  let textMessagesContainerEl = document.getElementById(
    "text-messages-container"
  );
  let messageBoxEl = document.getElementById("message-box");
  let message = messageBoxEl.value;
  
  //socket event 
  triggerprivateMessage(message)

  let template = sentMessage(message) 
  textMessagesContainerEl.innerHTML += template;
  scrollDown();
  messageBoxEl.value = "";
  //upload message to db
  updateMessageDb(message)
}

//helper functions for getMessages()
export function insertMessages(messages,currUserId) {
    let messageEl = document.getElementById("text-messages-container")
    // console.log(typeof messages);
    messages.forEach(message => {
        if(message.senderId == currUserId) {
            let template = sentMessage(message.textData, message.createdAt)
            messageEl.innerHTML += template
        }else {
            let template = recievedMessage(message.textData, message.createdAt)
            messageEl.innerHTML += template
        }
    } );

  }
export async function insertAbout(receieverId,curruser=false) {
  // display logout 
  if(curruser) {
    let logoutEl = document.getElementById("logout")
    console.log(logoutEl)
    logoutEl.style = "visibility:visible"
  }else {
    let logoutEl = document.getElementById("logout")
    console.log(logoutEl)
    logoutEl.style = "visibility:hidden"
  }
  // get userinfo from /userinfo/:userid
    let response = await fetch(`/userinfo/${receieverId}`, {headers:{
      jwttoken: getFromCookie("jwttoken")
    }})
    let data = await response.json()
    if(!data.phone) {
      data.phone = "Not Available"
    }

   let template = aboutUserTemplate(data.name, data.username, data.email, data.phone)
    let aboutListEl = document.getElementById("about-list")
    aboutListEl.innerHTML = template

    let profileInfo = document.getElementById("profile-name") 
    profileInfo.innerText = `${data.name}'s profile`
}

export async function getMessages(event) {
    let messageEl = document.getElementById("text-messages-container");
    messageEl.innerHTML = ""
    //selected username
    let userName = event.target.parentElement.lastElementChild.lastElementChild.innerText;
    //slicing @
      userName = userName.slice(1)
    console.log("selected user username: ", userName);
   
    let receieverId = localStorage.getItem(userName);
    let currUserId = getFromCookie("currUserId")
    console.log("curruser Id:", currUserId);
    // fetch "/conversation" and get messages (if present) with the conversation ID
    if (currUserId && receieverId) {
      let response = await fetch("/conversation", {
        method: 'POST',
      headers: {
        jwttoken : getFromCookie("jwttoken"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({senderId: currUserId,
                     receieverId:receieverId})} );
      let data = await response.json()
    console.log("data recieved from .conversation:", data);
    //  display reciever name in chat-header
    let recieverName = event.target.parentElement.firstElementChild.innerText;
    let messages = data.messages
    if(messages) {
        //store conversationId and insert message and set receivername
        localStorage.setItem("conversationId", data.convoId)
        let selectedUserNameHeaderEl = document.getElementById("selected-user-name-header")
        selectedUserNameHeaderEl.innerText = recieverName
        if(Object.keys(messages).length >= 1) {
            localStorage.setItem("conversationId", data.convoId)
            if (Object.keys(messages).length >=1) {
              insertMessages(messages,currUserId)
              }
          }else{
            let messageEl = document.getElementById("text-messages-container");
            messageEl.innerHTML = ""
        }
    }else{
      //store converstion Id
        localStorage.setItem("conversationId", data)
    }
    //change visibility of chat-container to visible
    let chatContainer = document.getElementById("chat-container")
    chatContainer.style.visibility = "visible"
    scrollDown()
    insertAbout(receieverId)

    } else {
      console.log("ERROR : Reciever Id not found");
    }
}