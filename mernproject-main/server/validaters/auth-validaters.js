const { z }=require("zod");

const signupSchema=z.object({

    username:z
    .string({required_error:"name is required"})
    .trim()
    .min(3,{message:"name must be of 3 char atleast"})
    .max(95,{message:"name must be not more than 95 char"}),

    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"invalid email address"})
    .min(5,{message:"email must be of 5 char atleast"})
    .max(25,{message:"email must be not more than 25 char"}),

    phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone must be of 10 char atleast"})
    .max(20,{message:"phone must be not more than 20 char"}),

    password:z
    .string({required_error:"password is required"})
    .min(3,{message:"password must be of 3 char atleast"})
    .max(255,{message:"password must be not more than 255 char"})
    .refine(data => /^[A-Z]/.test(data), {message: "First letter of the password must be uppercase"}),
});




const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email-address" })
    .min(5, { message: "Email must be of 5 characters atleast" })
    .max(255, { message: "Email must not be more than 255 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(7, { message: "Password must atleast be of 6 characters." })
    .max(1024, { message: "Password can't be greater than 1024 characters." })
    .refine(data => /^[A-Z]/.test(data), {message: "First letter of the password must be uppercase"}),
});



const contactSchema = z.object({
username:z
.string({required_error:"name is required"})
.trim()
.min(3,{message:"name must be of 3 char atleast"})
.max(90,{message:"name must be not more than 90 char"}),

email:z
.string({required_error:"email is required"})
.trim()
.email({message:"invalid email address"})
.min(5,{message:"email must be of 5 char atleast"})
.max(25,{message:"email must be not more than 25 char"}),

message:z
.string({required_error:"message is required"})
.trim()
.min(1,{message:"message must be of 1 char atleast"})
.max(867,{message:"message must be not more than 867 char"}),



});

module.exports={signupSchema,loginSchema,contactSchema};