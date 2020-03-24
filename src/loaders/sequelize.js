import Sequelize from 'sequelize'
import bottle from './bottle'
import config from '../config'

export default async () => {
  const logger = bottle.container.logger
  
  const sequelizeInstance = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
      host: config.database.host,
      dialect: 'postgres',
      timestamps: true,
    }
  )
  await sequelizeInstance
    .authenticate()
    .then(() => {
      logger.info(`DB loaded and connected [${config.database.database}]`)
    })
    .catch(err => {
      logger.info(`Unable to connect to the database[${config.database.database}]: ${err}`)
    })

  return sequelizeInstance
}
