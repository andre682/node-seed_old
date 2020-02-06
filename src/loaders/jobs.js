import config from '../config'
import EmailSequenceJob from '../jobs/emailSequence'
import NewUsersJob from '../jobs/newUser'
import Agenda from 'agenda'

export default ({ agenda }) => {
  const concurrency = config.agenda.concurrency
  agenda.defaultConcurrency = concurrency
  agenda.define(
    'send-email',
    { priority: 'high', concurrency },
    // TODO: Could this be a static method? Would it be better?
    new EmailSequenceJob().handler
  )

  agenda.define('check-new-users', { priority: 'normal', concurrency }, new NewUsersJob().handler)

  agenda.start()
}
