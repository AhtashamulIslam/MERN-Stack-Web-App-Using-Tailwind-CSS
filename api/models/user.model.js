import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
     },
     profilePicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    isAdmin:{ //We don't add it any api for security purpose. We change the Admin role
        type:Boolean,   // From MONGODB.
        default:false
    }
},
    
{
    timestamps:true
    //These will give data of the time of creation and the time of update.
}
)

const User = mongoose.model('User',userSchema)

export default User