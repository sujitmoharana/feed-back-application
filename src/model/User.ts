import mongoose, {Schema,Document} from "mongoose";
export interface Message extends Document {
  content:string
  createdAt:Date
}

const MessageSchema:Schema<Message>  = new Schema ({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifycode:string,
    verifycodeExpiry:Date,
    isVerifyed:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
}

const UserShema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\.+/,'please use valid email address']
    },
    password:{
       type:String,
       required:[true,"password is required"],
    },
    verifycode:{
        type:String,
        required:[true,"verifycode is required"]
    },
    verifycodeExpiry:{
        type:Date,
        required:[true,"verifycodeexpiry is requred"]

    },
    isVerifyed:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema] // https://chatgpt.com/s/t_68a330f96b688191b1c359585ee23c34
    
})


export const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserShema))