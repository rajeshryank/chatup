
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

//helper for sentMessage and RecievedMessage
function processTime(time){
    let timeConverted = new Date(time)

    let hr = timeConverted.getHours()
    let mi = timeConverted.getMinutes()
    if(hr<10) hr = '0' + hr
    if(mi<10) mi= '0' + mi
    let hrMi = hr + ':' + mi

    let currDate = new Date()
    if(currDate.getDate() > timeConverted.getDate()){
        let dd = timeConverted.getDate() 
        let mm = timeConverted.getMonth()
        let yyyy = timeConverted.getFullYear()
        yyyy =  String(yyyy).slice(2)
        let dmy = `${dd}/${mm}/${yyyy}`
        return {hour:hrMi,date:dmy}
    }else {
        return {hour:hrMi}
    }
}

// message bubble for sent and recieved messages 
export function sentMessage(message,time) {
    let finalTime = processTime(time)
    if(finalTime.date){
        let template = `<div class="message-bubble">
    <div class="sent-message"><p class="text">${message}</p><small class="sent-time">${finalTime.hour} ${finalTime.date}</small></div>
    </div>`
    return template
    } let template = `<div class="message-bubble">
    <div class="sent-message"><p class="text">${message}</p><small class="sent-time">${finalTime.hour}</small></div>
    </div>`
    return template
}
export function recievedMessage(message,time) {
    let finalTime = processTime(time)
    if(finalTime.date){
        let template = `<div class="message-bubble">
    <div class="receieved-message"><p class="text">${message}</p><small class="recieved-time">${finalTime.hour} ${finalTime.date}</small></div>
    <div class="r-empty-div"></div>
    </div>`
    return template
    } let template = `<div class="message-bubble">
    <div class="receieved-message"><p class="text">${message}</p><small class="recieved-time">${finalTime.hour}</small></div>
    <div class="r-empty-div"></div>
    </div>`
    return template
}