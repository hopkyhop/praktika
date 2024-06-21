const Router = require('express')
const router = new Router()

const courseRouter = require('./courseRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const formRouter = require('./formRouter')
const townRouter = require('./townRouter')
const favoritesRouter = require('./favoritesRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/form', formRouter)
router.use('/town', townRouter)
router.use('/course', courseRouter)
router.use('/favorites', favoritesRouter)

module.exports = router


