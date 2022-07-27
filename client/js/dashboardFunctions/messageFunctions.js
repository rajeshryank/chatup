import { scrollDown, getFromCookie } from "./helperfunctions.js";
import {aboutUserTemplate,sentMessage,recievedMessage} from "./templates.js"
import { socket } from "../dashboard.js";

// upload message to DB with convoId, senderId and textData 
export function updateMessageDb(textData){
    let senderId = localStorage.getItem("currUser")
    let conversationId = localStorage.getItem("conversationId")
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
    //get reciever's username and ID
    let recieverUserEl = document.getElementsByClassName("name-focus-class")[0]
    let recieverUserName = recieverUserEl.parentElement.lastElementChild.innerText
    recieverUserName = recieverUserName.slice(1);
    let recieverId = localStorage.getItem(recieverUserName)
    console.log("recieverMongoId",recieverId);
    //emit message 
    socket.emit("privateMessage", 
       {message:message, 
        recieverMongoId:recieverId})
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
  let currentTime = new Date()
  let template = sentMessage(message, currentTime) 
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
    } 
    );
  }

// if second arg true enables logout and insertsdata
export async function insertAbout(userId,curruser=false) {
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
    let response = await fetch(`/userinfo/${userId}`, {headers:{
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

export function getMessages(receieverId) {
    let messageEl = document.getElementById("text-messages-container");
    messageEl.innerHTML = ""
    //curr user's mongoId 
    let currUserId = getFromCookie("currUserId")
    // fetch "/conversation" and get messages (if present) with the conversation ID
    if (currUserId && receieverId) {
    fetch("/conversation", {
        method: 'POST',
      headers: {
        jwttoken : getFromCookie("jwttoken"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({senderId: currUserId,
                     receieverId:receieverId})} ).then((response)=>response.json()).then(data=>{
                      let messages = data.messages
                      if(messages) {
                          //store conversationId and insert messages
                          localStorage.setItem("conversationId", data.convoId)
                          if(Object.keys(messages).length >= 1) {
                                insertMessages(messages,currUserId)
                            }else{
                              let messageEl = document.getElementById("text-messages-container");
                              messageEl.innerHTML = ""
                          }
                      }else{
                        //store converstion(to send messages)
                          localStorage.setItem("conversationId", data)
                      }
                      scrollDown()
                      insertAbout(receieverId)
                     })
    } else {
      console.log("ERROR : Reciever Id or currUser ID not found ",  currUserId, receieverId )
    }
}