import { store } from '../index.js';
let dispatch = store.dispatch;



export function increase() {
    console.log(arguments);
    setTimeout(() => {
        dispatch({
            type: 'CHANGE_USER_NAME',
            name: 1
        });
    }, 1000)
};

export function decrease() {
    store.dispatch({
        type: 'CHANGE_USER_NAME_decrease',
        name: 1
    })
}