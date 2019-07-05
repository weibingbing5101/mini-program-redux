// 这是一个 initstate 状态
// reducer 主要是操作 store.state  是一个同步函数   只能在此处操作state
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