// 
// 
// 
// 
// 
// 

// 因为小程序没有提供 类似react-redux这种工具(provider mapStateToProps mapDispatchToProps等方法) 
// 所以只能手动引入 action   调用actions 执行相应的dispatch reducer 修改state  
// 然后在修改state后 执行事先定义好的  store.subscribe  更新 view视图

import { increase, decrease } from '../../store/action/index.js';

const app = getApp()

const store = app.store;



Page({
    data: {
        ...store.getState().user
    },
    increase,
    decrease,

    onLoad: function(options) {
        let that = this;
        // redux暴露出来的  renducer后 执行  发布订阅 的函数
        store.subscribe(function() {
            that.setData({ ...store.getState().user });
        })
    }
})