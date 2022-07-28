import { scrollDown, getFromCookie } from "./helperfunctions.js";
import {aboutUserTemplate} from "./templates.js"

// creates template using data from getUsers() func and append
//it to element list-of-user in html
export function generateUsersList(data) {
  let listel = document.getElementById("list-of-users");
  for (let i = 0; i < data.length; i++) {
    let template = `<li class="user-line" tabindex="0">
              <div class="user">
              <p class="name">${data[i][0]}</p>
              <p class="username"><small>@${data[i][1]}</small></p> 
              </div>
       <i class="user-icon fa-solid fa-user"></i>      
      </li>`;
    // stores user's username and id in localstorage as key:value
    window.localStorage.setItem(`${data[i][1]}`, `${data[i][2]}`);
    listel.innerHTML += template;
  }
  console.log("generateUserlist done");
  scrollDown();
}

//fetch users list  and call generateUsersList()
export async function getUsers() {
  // currUserId from cookies
  let currUserId = getFromCookie("currUserId");
  const response = await fetch(`/user/${currUserId}`);
  const data = await response.json();
  generateUsersList(data);
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
    let response = await fetch(`/userinfo/${userId}`)
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
