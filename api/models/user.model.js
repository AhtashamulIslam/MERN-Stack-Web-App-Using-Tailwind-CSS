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
     }
},
{
    timestamps:true
    //These will give data of the time of creation and the time of update.
}
)

const User = mongoose.model('User',userSchema)

export default User