import { createStore, combineReducers, applyMiddleware } from '../module/redux/dist/redux.js'

import { user, project } from './reducer/index.js';





var rootReducer = combineReducers({
    user,
    project
})

const store = createStore(rootReducer)

export { store };


// return {
//     dispatch,
//     getState,
//     sub
// }