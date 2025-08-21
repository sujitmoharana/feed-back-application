import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";
import { success } from "zod";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,email,password} = await request.json()
     const existingUserverifyedByUsername = await UserModel.findOne({
            username,isVerifyed:true
        })
        if (existingUserverifyedByUsername) {
            return Response.json({success:false,message:"username is already taken"},{status:400})
        }

     const existingUserByEmail = await UserModel.findOne({email})
     const verifycode = Math.floor(100000+Math.random()*900000).toString();
     if (existingUserByEmail) {
       if (existingUserByEmail.isVerifyed) {
        return Response.json({success:false,message:"user already exist with this email"},{status:400})
       }else{
        const hashpassword = await bcrypt.hash(password,10)
        existingUserByEmail.password = hashpassword;
        existingUserByEmail.verifycode = verifycode;
        existingUserByEmail.verifycodeExpiry = new Date(Date.now()+3600000);
         await existingUserByEmail.save();
       }
    }else{
        const hashPaswword = await bcrypt.hash(password,10);
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours()+1);
       const newuser =  new UserModel({
            username,
            email,
            password:hashPaswword,
            verifycode,
            verifycodeExpiry:expiryDate,
            isVerifyed:false,
            isAcceptingMessage:true,
            messages:[]
        })
        await newuser.save();
     }

     //send verification email
    const emailResponse =  await sendVerificationEmail(email,username,password);
if (!emailResponse.success) {
    return Response.json({success:false,message:emailResponse.message},{status:500})
}

return Response.json({success:true,message:"user register seccessfully . please verify your email"},{status:500})


    } catch (error) {
        console.log("Error registreing user",error);
        return Response.json({success:false,message:'Error registreing user'},{status:500})
    }
}