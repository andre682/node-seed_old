import expressLoader from './express'
import bottle from './bottle'
import LoggerInstance from './logger'
import mongooseLoader from './mongoose'
import User from '../models/user'
import AuthService from '../services/auth'
import eventDispatcher from './events'

export default async ({ expressApp }) => {
  // loader logger
  bottle.factory('logger', () => LoggerInstance)
  const logger = bottle.container.logger
  logger.silly('silly logg')
  const mongoConnection = await mongooseLoader()
  logger.info('DB loaded and connected!')

  // Load models
  bottle.factory('userModel', () => User)

  // Load services
  bottle.factory('AuthService', container => new AuthService(container))

  // load subscribers
  bottle.factory('eventDispatcher', container => eventDispatcher(container))

  //load express
  await expressLoader({ app: expressApp })
  logger.info('Express loaded')
}
