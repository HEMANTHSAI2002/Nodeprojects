const express = require('express')

const router = express.Router()
const {
    handlerGetList,
    handlerGetHtmlList,
    handlerGetUserByID,
    handlerPostAddUser,
    handlerPatchUser,
    handlerDeleteUser,
} = require('../controllers/app_handler')

router.get('/list',handlerGetList)

router.get('/html/list',handlerGetHtmlList)

router.get('/list/:id',handlerGetUserByID)

router.post('/add',handlerPostAddUser)

router.patch('/patch/:id',handlerPatchUser)

router.delete('/delete/:id',handlerDeleteUser)


module.exports = router

