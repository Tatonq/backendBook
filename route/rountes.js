const express = require('express')
const router = express.Router()
const { creteMenu, getMenu, getMenuById, updateMenuById, deleteMenuById} = require('../controller/menu-controller')

router.post('/create-menu', creteMenu)
router.get('/menus', getMenu)
router.get('/get-menu/:id', getMenuById)

router.put('/update-menu/:id', updateMenuById)
router.delete('/delete-menu/:id', deleteMenuById)

module.exports = router