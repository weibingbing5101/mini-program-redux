Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    properties: {
        // show: {            // 属性名
        //     type:Boolean,    // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        //     value:false   // 属性初始值（可选），如果未指定则会根据类型选择一个
        // },
        content :{
            type : String ,
            value : '弹窗内容'
        },
        sharecode: {
            type : String ,
            value : '红包'
        }
    },

    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
        // 弹窗显示控制
        isShow:false
    },

    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
        /*
         * 公有方法
         */

        //隐藏弹框
        hide(){
            this.setData({
                isShow: false
            })
        },
        //展示弹框
        show(){
            this.setData({
                isShow: true
            })
        },

        goToRules(){
            wx.showToast({title:'跳转规则页',icon:'none'});
            // window.location.href = './rules.html#/?sharecode='+this.sharecode;
        },
        goToList(){
            wx.showToast({title:'跳转列表页',icon:'none'});
            // window.location.href = './red-envelopes-list.html#/?sharecode='+this.sharecode;
        }
    }
})