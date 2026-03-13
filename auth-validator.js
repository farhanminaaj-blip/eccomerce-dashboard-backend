import{email,z}from"zod";
export const signupSchema = z.object({
    username:z.string({
        required_error:"Name is required"})
        .trim().min(3,{message:"Name must be atleast of 3  characters"})
        .max(255,{message:"name must not be more than 255  characters"}),

        position:z.string({ required_error:"Position is required"})
        .trim().min(2,{message:"Position must be atleast of 2  characters"})
        .max(255,{message:"Position must not be more than 255  characters"}),

        email:z.string({ required_error:"Email is required "})
        .trim().email({ message:"Invalid email address"})
        .min(3,{message:"Email must be atleast of 3  characters"}),

        phone_number:z.string({ required_error:"Phone number is required"})
        .trim().min(10,{ message:"Phone number must be atleast of 10  characters"})
        .max(20,{ message:"Phone number  must not be more then character 200"}),

        password:z.string({ required_error:"Password is required"})
        .trim().
        min(7,{message:"Password must be atleast of  6 characters"})
        .max(1023,{message:"Password can't be more than 1024 characters"}),
})