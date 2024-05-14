const z = require('zod')

const postAddSchema = z.object({
    "first_name":z.string(),
    "last_name":z.string(),
    "email":z.string().email(),
    "gender":z.string(),
    "ip_address":z.string().ip()
})

module.exports={
    postAddSchema
}