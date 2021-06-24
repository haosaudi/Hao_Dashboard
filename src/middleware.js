import promise from 'redux-promise-middleware'

import thunk from 'redux-thunk'

const middlewares = []

middlewares.push(promise)

middlewares.push(thunk)

export default middlewares
