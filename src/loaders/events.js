//Here we import all events
import events from 'events'
import eventsLabels from '../subscribers/events'
import UserSubscriber from '../subscribers/user'

export default function (container) {
    const emitter = new events.EventEmitter()
    
    const userListener = new UserSubscriber(container)

    emitter.on(eventsLabels.user.signUp, userListener.onUserSignUp)
    emitter.on(eventsLabels.user.signIn, userListener.onUserSignIn)
    
    return emitter
}