// pages/rules.js
const app = getApp()
import mathTool from '../../utils/mathtool.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        start_time: '2018-04-29 22:00:00',
        reward_max: '200个',
        symbol: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        let that = this;
        // this.setData({});
        // console.log(mathTool);

        app.api.getactivitydetail({
            sharecode: options.sharecode
        }).then(data => {
            if (data.status === 200) {
                let reqData = data.data;
                let decimal = reqData.decimal;
                let decimalNum = Math.pow(10, decimal);

                that.setData({
                    start_time: reqData.start_time,
                    reward_max: mathTool.division(reqData.reward_max, decimalNum, decimal),
                    symbol: reqData.symbol
                });
            } else {
                // this.showTip(data.msg);
            }
        }).catch(data => {
            // this.showTip(data);
        })
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

    }
})