import bottle from '../../loaders/bottle'

const attachCurrentUser = async (req, res, next) => {
  const logger = bottle.container.logger
  try {
    const UserModel = bottle.container.userModel
    const userRecord = await UserModel.findById(req.token._id)
    if (!userRecord) {
      return res.sendStatus(401)
    }
    const currentUser = userRecord.toObject()
    Reflect.deleteProperty(currentUser, 'password')
    Reflect.deleteProperty(currentUser, 'salt')
    req.currentUser = currentUser
    return next()
  } catch (e) {
    logger.error('🔥 Error attaching user to req: %o', e)
    return next(e)
  }
}

export default attachCurrentUser
