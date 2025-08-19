import {z} from "zod"

export const usernameValidation = z.string().min(2,"username must be atleast 2 character").max(20,"username must be no more than 20 character").regex(/^[a-zA-Z0-9]{3,16}$/,"username must not contain special character");

export const signupSchema = z.object({
  username:usernameValidation,
  email: z.string().email({message:"invalid email"}),
  password:z.string().min(6,{message:"pasword must be atleast 6 character"})
})