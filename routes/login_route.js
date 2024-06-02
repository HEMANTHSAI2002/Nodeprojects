const express = require('express')

const login_router = express.Router()
const login_handler = require('../controllers/login_handler')
const middleware = require('../middlewares/paramvalidation')

login_router.post('/signin',middleware.middlewareLoginUser,login_handler.handlerPostLoginUser)
login_router.post('/generatetoken',login_handler.handlerBearerTokenGen)

module.exports = login_router