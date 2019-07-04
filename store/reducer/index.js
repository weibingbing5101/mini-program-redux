// 一个reducer
function user(state = { name: 0 }, action) {
    switch (action.type) {
        case 'CHANGE_USER_NAME':
            return {
                ...state,
                name: state.name += 1
            }
        case 'CHANGE_USER_NAME_decrease':
            return {
                ...state,
                name: state.name -= 1
            }
    }

    return state
}


// 一个reducer
function project(state = { name: 'min-react' }, action) {
    switch (action.type) {
        case 'CHANGE_PROJECT_NAME':
            return {
                ...state,
                name: action.name
            }
    }

    return state
}


export { user, project };