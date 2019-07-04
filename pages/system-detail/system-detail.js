// pages/system-detail/system-detail.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 500,
        showShareTip: false, //分享提示

        openid: '13810434831',
        sharecode: 'pge7XB',

        invalidTipContent: '',

        targetCount: '--',
        restCount: '--',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchDetail();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        //获得dialog组件
        this.dialog = this.selectComponent("#dialog");
        this.invalidTip = this.selectComponent("#invalidTip");
    },

    // /**
    //  * 生命周期函数--监听页面显示
    //  */
    // onShow: function () {
    //
    // },
    //
    // /**
    //  * 生命周期函数--监听页面隐藏
    //  */
    // onHide: function () {
    //
    // },
    //
    // /**
    //  * 生命周期函数--监听页面卸载
    //  */
    // onUnload: function () {
    //
    // },
    //
    // /**
    //  * 页面相关事件处理函数--监听用户下拉动作
    //  */
    // onPullDownRefresh: function () {
    //
    // },
    //
    // /**
    //  * 页面上拉触底事件的处理函数
    //  */
    // onReachBottom: function () {
    //
    // },
    //
    // /**
    //  * 用户点击右上角分享
    //  */
    // onShareAppMessage: function () {
    //
    // },

    /**
     * 获取红包详情
     * */
    fetchDetail() {
        wx.showLoading({ title: '拼命加载中...' })
        return app.api.getredpacketdetail({
            openid: this.data.openid,
            sharecode: this.data.sharecode
        }).then(rep => {
            if (rep.status === 200) {
                wx.hideLoading();

                // 本页面展示系统红包各种状态 + 组团红包成功状态
                if (rep.data.redpacket.type === 0 && rep.data.redpacket.status !== 1) {
                    this.setData({ invalidTipContent: '别糊弄我，该链接无效' })
                    this.invalidTip.show();
                    return;
                }

                if (rep.data.redpacket.status === 1) {
                    if (!_findMine(this.data.openid, rep.data.redpacket.users)) {
                        this.setData({ invalidTipContent: '手慢了，红包抢光了' })
                        this.invalidTip.show();
                    }
                } else if (rep.data.redpacket.status === 2) {
                    this.setData({ invalidTipContent: '太遗憾了，该红包已过期' })
                    this.invalidTip.show();
                }

                this.setData({ targetCount: rep.data.redpacket.target_count });
                this.setData({ restCount: rep.data.redpacket.target_count - rep.data.redpacket.actor_count });

            } else {
                wx.showToast({ title: rep.msg, icon: 'none' });
            }
        })

        function _findMine(myOpenid, arr) {
            let result = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].openid == myOpenid) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    },


    onShareAppMessage: function(res) {
        return {
            title: '',
            path: '/pages/system-detail/system-detail?sharecode=' + this.data.sharecode,
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },

    goToRules() {
        //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
        wx.navigateTo({
            url: '/pages/rules/rules?sharecode=' + this.data.sharecode
        });

    },
    goToList() {
        wx.showToast({ title: 'list', icon: 'none' });
        // window.location.href = './red-envelopes-list.html#/?sharecode='+this.sharecode;
    },

    createTeamPacket() {
        wx.navigateTo({
            url: '/pages/reg-phone/reg-phone?sharecode=' + this.data.sharecode + '&from=' + 'system-detail'
        });
    },


    showDialog() {
        this.dialog.showDialog();
    },

    showDialog() {
        this.dialog.showDialog();
    },

    //取消事件
    _cancelEvent() {
        console.log('你点击了取消');
        this.dialog.hideDialog();
    },
    //确认事件
    _confirmEvent() {
        console.log('你点击了确定');
        this.dialog.hideDialog();
    }
})