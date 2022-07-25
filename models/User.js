const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    hash:{
        type:String,
        required:true
    }
}) 
//check duplicates for email
userSchema.statics.isEmailDuplicate = async function(email) {
    try {
        let emailExist = await this.findOne({email})
        if(emailExist) return false
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}

//check duplicates for username
userSchema.statics.isUsernameDuplicate = async function(username){
    try {
        let usernameExist = await this.findOne({username})
        if(usernameExist) return false
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const userModel = mongoose.model("users", userSchema);

module.exports = {userModel}