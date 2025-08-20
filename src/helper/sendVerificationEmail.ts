import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/Verificationemail";
import { ApiResoponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResoponse>{ /* https://chatgpt.com/s/t_68a5c7bb09088191a32f74e4917c0198  https://chatgpt.com/s/t_68a5c7e064948191b0dbae58fcc5b10a        */
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello world',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:'verification email sent sucessfully'}
    } catch (emailerror) {
        console.log("error sending verification email",emailerror);
        return {success:false,message:'failed to send verification email'}
    }
}