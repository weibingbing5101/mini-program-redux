// pages/system-detail/team-detail.js
const app = getApp();
import mathTool from '../../utils/mathtool.js';

let myDate = new Date();
let openid = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString();
let phoneReg = /^(\+86)?(((13[0-9])|(14[0-25-9])|(15[0-9])|(17[135-8])|(18[0-9]))\d{8})|((170[0-9])\d{7})$/;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sharecode: '',
        timer: null,
        isSubmitting: false,
        headerImg: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2516860505,3390463418&fm=58&w=121&h=121&img.JPEG',

        imgCodeSrc: '',
        codeTimer: 0,
        isGetPhoneCode: true, // 可以获得手机验证码

        // 红包说明
        reward_max: '200个', // 最大可获得
        symbol: '', // 代币标识
        start_time: '2018-04-29 22:00:00',
        startTime: '4.29',
        endTime: '5.3',

        from: '',

        form: {
            phone: '',
            code: '',
            phoneCode: '',
            rand: '',
        },

        //Tips
        showTips: false,
        tipsContent: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            sharecode: options.sharecode,
            from: options.from
        });

        console.log(this.data);

        this.changeCode();
        this.getDetails();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    getDetails: function() {
        let that = this;

        if (this.data.sharecode != 'undefined') {
            wx.showLoading({ title: '拼命加载中...' })
            app.api.getactivitydetail({
                sharecode: that.data.sharecode
            }).then(data => {
                if (data.status === 200) {
                    let reqData = data.data;
                    let decimal = reqData.decimal;
                    let decimalNum = Math.pow(10, decimal);


                    let startTimeArr = reqData.start_time.split(' ')[0].split('-').splice(1);
                    let endTimeArr = reqData.end_time.split(' ')[0].split('-').splice(1);


                    this.setData({
                        start_time: reqData.start_time,
                        startTime: parseFloat(startTimeArr[0]) + '.' + parseFloat(startTimeArr[1]),
                        endTime: parseFloat(endTimeArr[0]) + '.' + parseFloat(endTimeArr[1]),
                        reward_max: mathTool.division(reqData.reward_max, decimalNum, decimal),
                        symbol: reqData.symbol
                    });
                } else {
                    wx.showToast({ title: data.msg, icon: 'none' });
                    // this.showTip(data.msg);
                }
                wx.hideLoading();
            }).catch(data => {
                wx.hideLoading();
                wx.showToast({ title: data.msg, icon: 'none' });
                // this.showTip(data);
            })
        }
    },

    submit: function() {
        if (this.phoneCheck() && this.codeCheck() && this.phoneCodeCheck()) {
            this.setData({
                submitting: true
            })
            app.api.signup({
                headimgurl: this.data.headerImg,

                name: this.data.form.phone.substr(0, 3) + "****" + this.data.form.phone.substr(7),
                openid: this.data.form.phone,
                phone: this.data.form.phone,
                verifycode: this.data.form.phoneCode
            }).then(data => {
                if (data.status === 200) {
                    wx.showToast({ title: '注册成功', icon: 'none' });
                    wx.setStorageSync('openid', this.data.form.phone);

                    let from = this.data.from;

                    if (!from) {
                        return false;
                    }

                    wx.navigateTo({
                        url: '/pages/' + from + '/' + from + '?sharecode=' + this.data.sharecode
                    });

                } else if (data.status === 201) {
                    wx.showToast({ title: '登录成功', icon: 'none' });

                    wx.setStorageSync('openid', this.data.form.phone);

                    let from = this.data.from;
                    if (!from) {
                        return false;
                    }
                    wx.navigateTo({
                        url: '/pages/' + from + '/' + from + '?sharecode=' + this.data.sharecode
                    });
                } else {
                    wx.showToast({ title: data.msg, icon: 'none' });
                }


                this.setData({
                    submitting: false
                });
            }).catch(data => {
                this.setData({
                    submitting: false
                });
                wx.showToast({ title: data.msg, icon: 'none' });
                // this.showTip(data);
            })
        };
    },
















    // === 已经完成的
    // ===============================   input change
    phoneChange: function(e) {
        this.data.form.phone = e.detail.value.replace(/\D/g, '')
        this.setData({
            form: this.data.form
        })
    },

    imgCodeChange: function(e) {
        this.data.form.code = e.detail.value;
        this.setData({
            form: this.data.form
        })
    },
    phoneCodeChange: function(e) {
        this.data.form.phoneCode = e.detail.value;
    },

    clearTimer: function() {
        if (this.timer) {
            clearTimeout(this.timer);
            return true;
        } else {
            return false;
        }
    },







    // 改变图形验证码 点击
    changeCode: function() {
        app.api.getcaptcha({
            openid: openid
        }).then(data => {
            if (data.status === 200) {
                this.setData({
                    imgCodeSrc: data.data.url,
                    rand: data.data.url.split('?')[1].split('=')[1]
                });
            } else {
                wx.showToast({ title: data.msg, icon: 'none' });
                // this.showTip(data.msg);
            }

        }).catch(data => {
            wx.showToast({ title: data.msg, icon: 'none' });
            // this.showTip(data);
        })
    },
    getverifycode: function() {
        let that = this;
        
        if (this.phoneCheck() && this.codeCheck() && this.data.isGetPhoneCode) {
            this.data.isGetPhoneCode = false;
            app.api.getverifycode({
                phone: this.data.form.phone,
                captcha: this.data.form.code,
                rand: this.data.rand
            }).then(data => {
                if (data.status === 200) {
                    wx.showToast({ title: data.msg, icon: 'none' });
                    let num = 60;
                    let timer = setInterval(() => {
                        that.setData({
                            codeTimer: num--
                        });
                        if (that.data.codeTimer == 0) {
                            clearInterval(timer);
                            that.data.isGetPhoneCode = true;
                        }
                    }, 1000);
                } else {
                    wx.showToast({ title: data.msg, icon: 'none' });
                    this.data.isGetPhoneCode = true;
                    this.changeCode();
                    this.data.form.code = '';
                    this.setData({
                        form: this.data.form
                    });
                    
                    // this.showTip(data.msg);
                }
            }).catch(data => {
                this.data.isGetPhoneCode = true;
                this.changeCode();
                this.data.form.code = '';
                this.setData({
                    form: this.data.form
                })
                wx.showToast({ title: data.msg, icon: 'none' });
                // this.showTip(data);
            })
        }
    },


    // ===
    phoneCheck: function() {
        if (!this.data.form.phone) {
            wx.showToast({ title: '手机号码不能为空', icon: 'none' });
            // this.showTip("手机号码不能为空");
            return false;
        }
        if (!phoneReg.test(this.data.form.phone.replace(/\s/g, ''))) {
            // this.showTip("手机号码格式不正确");
            wx.showToast({ title: '手机号码格式不正确', icon: 'none' });

            return false;
        }
        return true;
    },
    codeCheck: function() {
        if (!this.data.form.code) {
            wx.showToast({ title: '图形验证码不能为空', icon: 'none' });
            // this.showTip("图形验证码不能为空");
            return false;
        }
        if (this.data.form.code.length != 5) {
            wx.showToast({ title: '图形验证码必须为5位', icon: 'none' });

            // this.showTip("图形验证码必须为5位");
            return false;
        }
        return true;
    },
    phoneCodeCheck: function() {
        if (!this.data.form.phoneCode) {
            wx.showToast({ title: '手机验证码不能为空', icon: 'none' });
            return false;
        }
        if (this.data.form.phoneCode.length != 5) {
            wx.showToast({ title: '手机验证码必须为5位', icon: 'none' });
            return false;
        }
        return true;
    },
});




























// ====