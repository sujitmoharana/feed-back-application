import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";
import { success } from "zod";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,email,password} = await request.json()
    } catch (error) {
        console.log("Error registreing user",error);
        return Response.json({success:false,message:'Error registreing user'},{status:500})
    }
}