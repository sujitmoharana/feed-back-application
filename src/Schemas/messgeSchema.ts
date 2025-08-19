import {z} from "zod"

export const MessageSchema = z.object({
  content:z.string().min(10,{message:"message must be at least of 10 character"}).max(300,{message:"content must be no longor then 300 character"})
})