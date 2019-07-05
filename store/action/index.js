import { store } from '../index.js';

// 因为没有使用 applyMiddleware  所以异步就在action里面调用  也是一种学习成本较低的学习方式
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