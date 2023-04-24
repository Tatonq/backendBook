const express = require('express')
const router = express.Router()
const { creteMenu, getMenu, getMenuById, updateMenuById, deleteMenuById} = require('../controller/menu/menu-controller')
const { register, login } = require('../controller/user/user')
router.post('/create-menu', creteMenu)
router.get('/menus', getMenu)
router.get('/get-menu/:id', getMenuById)

router.put('/update-menu/:id', updateMenuById)
router.delete('/delete-menu/:id', deleteMenuById)

router.post('/sing-up', register)
router.post('/sing-in', login)
module.exports = router