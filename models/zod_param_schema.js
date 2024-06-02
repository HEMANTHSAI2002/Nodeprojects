const z = require('zod')

const postAddSchema = z.object({
    "first_name":z.string(),
    "last_name":z.string(),
    "email":z.string().email(),
    "gender":z.string(),
    "ip_address":z.string().ip()
})

const postLoginSchema = z.object({
    "Username":z.string(),
    "Password":z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

module.exports={
    postAddSchema,
    postLoginSchema
}