import middlewares from '../middlewares'
import { Router } from 'express'
const route = Router()

export default app => {
  app.use('/users', route)

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) => {
    return res.json({ user: req.currentUser }).status(200)
  })
}
