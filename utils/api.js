// const URI = 'https://api.kcash.com';
const URI = 'http://invite.test-kcash.com';
const fetch = require('./fetch')

function fetchApi (type, params) {
    return fetch(URI, type, params)
}

/*
 注册
 */
function signup(param = {}) {
    return fetchApi('/api/signup', param).then(res => res.data)
}


/*
 获取手机验证码
 */
function getverifycode(param = {}) {
    return fetchApi('/api/getverifycode', param).then(res => res.data)
}
/*
 获取 图形 验证码
 */
function getcaptcha(param = {}) {
    return fetchApi('/api/getcaptcha', param).then(res => res.data)
}

/*
 必须登陆 传openid 获取红包详情
 */
function getredpacketdetail(param = {}) {
    return fetchApi('/api/getredpacketdetail', param).then(res => res.data)
}

/*
 不需要登陆  可不传openid 获取红包详情
 */
function getactivitydetail(param = {}) {
    return fetchApi('/api/getactivitydetail', param).then(res => res.data)
}

/*
 获取红包列表
 */
function getredpacketlist(param = {}) {
    return fetchApi('/api/getredpacketlist', param).then(res => res.data)
}
/*
 组团红包页面  抢红包接口
 */

function joinredpacket(param = {}) {
    return fetchApi('/api/joinredpacket', param).then(res => res.data)
}

/**
 * 创建红包
 * */
function createredpacket(param = {}){
    return fetchApi('/api/createredpacket', param).then(res => res.data)
}



module.exports = {
    signup,
    getverifycode,
    getcaptcha,
    getredpacketdetail,
    getactivitydetail,
    getredpacketlist,
    joinredpacket,
    createredpacket
}
