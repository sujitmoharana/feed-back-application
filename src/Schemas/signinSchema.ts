import {z} from "zod"

export const signInSchema = z.object({
  /* u can write identifier or u can  also  write email   */  identifier:z.string(),
    password:z.string()
})