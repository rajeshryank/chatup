
export function aboutUserTemplate(name,username,email,phone) {
    let template =`<li class="about-line" id="name">
                    <i class=" about-icon fa-solid fa-file-signature"></i>
                    <div class="about-text-container">
                        <p class="about-text">Name:
                        <p class="about-data">${name} </p>
                    </div>
                </li>
                <li class="about-line" id="username">
                    <i class=" about-icon fa-solid fa-user-astronaut"></i>
                    <div class="about-text-container">
                        <p class="about-text">Username:
                        <p class="about-data" >@${username}</p>         
                    </div>
                </li>
                <li class="about-line" id="email">
                    <i class="about-icon fa-solid fa-envelope"></i>
                    <div class="about-text-container">
                        <p class="about-text"> Email:
                        <p class="about-data"> ${email}</p>
                    </div>
                </li>
                <li class="about-line" id="phone">
                    <i class="about-icon fa-solid fa-phone"></i>
                    <div class="about-text-container">
                        <p class="about-text">Phone:
                        <p class="about-data">${phone}</p>
                    </div>
                </li>`
        return template
}


// message bubble for sent and recieved messages 
export function sentMessage(message, time) {
    let template = `<div class="message-bubble">
            <div class="sent-message"><p class="text">${message}</p><small class="sent-time">${"12:21"}</small></div>
            <div class="r-empty-div"></div>
            </div>`
            return template
}
export function recievedMessage(message,time) {
    // time = Date(time)
    let template = `<div class="message-bubble">
    <div class="receieved-message"><p class="text">${message}</p><small class="recieved-time">${"12:21"}</small></div>
    <div class="r-empty-div"></div>
    </div>`
    return template
}