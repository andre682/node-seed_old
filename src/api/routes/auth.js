import { Router } from 'express'
import bottle from '../../loaders/bottle' 
import middlewares from '../middlewares'
import { celebrate, Joi } from 'celebrate'

const route = Router()

export default app => {
  app.use('/auth', route)

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const logger = bottle.container.logger
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
      try {
        const authServiceInstance = bottle.container.AuthService
        const { user, token } = await authServiceInstance.SignUp(req.body)
        return res.status(201).json({ user, token })
      } catch (e) {
        logger.error('🔥 error: %o', e)
        return next(e)
      }
    }
  )

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const logger = bottle.container.logger
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body
        const authServiceInstance = bottle.container.AuthService
        const { user, token } = await authServiceInstance.SignIn(email, password)
        return res.json({ user, token }).status(200)
      } catch (e) {
        logger.error('🔥 error: %o', e)
        return next(e)
      }
    }
  )

  route.post('/logout', middlewares.isAuth, (req, res, next) => {
    const logger = bottle.container.logger
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end()
    } catch (e) {
      logger.error('🔥 error %o', e)
      return next(e)
    }
  })
}
