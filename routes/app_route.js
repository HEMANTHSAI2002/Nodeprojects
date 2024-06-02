const express = require('express')

const router = express.Router()
const middleware = require('../middlewares/paramvalidation')
const handler = require('../controllers/app_handler')

router.get('/list',middleware.middlewareBearertokenVerify,handler.handlerGetList)

router.get('/html/list',handler.handlerGetHtmlList)

router.get('/list/:id',handler.handlerGetUserByID)

router.post('/add',middleware.middlewareAddUser,handler.handlerPostAddUser)

router.patch('/patch/:id',handler.handlerPatchUser)

router.delete('/delete/:id',handler.handlerDeleteUser)


module.exports = router

