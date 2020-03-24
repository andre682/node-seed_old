export default class UserSubscriber {
  constructor(container) {
    this.logger = container.logger
    this.logger.silly('construindo o userSubscribe')
  }
  onUserSignIn({ _id }) {
    try {
      const UserModel = Container.get('UserModel')

      UserModel.update({ _id }, { $set: { lastLogin: new Date() } })
    } catch (e) {
      this.logger.info(`Error on event ${events.user.signIn}: %o`, e)

      // Throw the error so the process die (check src/app.ts)
      throw e
    }
  }
  onUserSignUp({user}) {
    console.log(user)
    console.log(this)
    this.logger.silly('construindo o userSubscribe')

    // try {
    //   this.logger.silly(`User ${name} signed up with this email ${email} `)
    // } catch (e) {
    //   console.log(this.logger)
    //   this.logger.info(`Error on event ${events.user.signUp}: %o`, e)

    //   // Throw the error so the process dies (check src/app.ts)
    //   throw e
    // }
  }
}
