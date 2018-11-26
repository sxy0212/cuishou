import Vue from 'vue'
import axios from 'axios'

function formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + "";
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
                );
            }
        }
        return fmt;
    }
    function getCookie(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        return null;
    }
    function setCookie(name, value, day) {
         var oDate = new Date();
         oDate.setDate(oDate.getDate() + day);
       document.cookie = name + '=' + value + ';expires=' + oDate;
    }
   function  axiosParams(data) {
        const params = new URLSearchParams();
        if (data) {
            for (let param in data) {
                params.append(param, data[param]);
            }
        }
        return params;
    }
    
    // 返回的为data
    function  axiosRequest(conf) {
        if (conf.url == undefined || !conf.url) throw new Error("说好的url参数尼");
        if (conf.data == undefined) conf.data = "";
        const param = axiosParams(conf.data);
        axios.post(conf.url, param)
            .then((response) => {
                if (parseInt(response.data.statusCode) == 1) {
                    if (conf.success != undefined && conf.success != "") {
                        if (typeof conf.success == "function") {
                            conf.success(response.data);
                        } else {
                            eval(conf.success + "=response.data.info");
                        }
                    }
                } else {
                    if (response.data.message) {
                        // Vue.prototype.$message.error(response.data.message);
                        conf.success(response.data);
                    } else {
                        let info = "";
                        _.forEach(response.data.info, (value) => {
                            info += value;
                        })
                        // Vue.prototype.$message.error(info);
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                if(error.response&&error){ 
                    if(error.response.status != 200){
                        Vue.prototype.$message.error('出现异常错误,请联系供应商');
                    }
                }
            })
    }
    function  goHome(url) {
        if (url) window.location.href = url;
        else window.location.href = window.location.pathname + "?r=asr-robot-dashboard";
    }
//实现元素跟随鼠标点击拖动
// 引用，写在元素上v-move
Vue.directive("move",{
    bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    
    dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
        
        // 获取到的值带px 正则匹配替换
        let styL, styT

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if(sty.left.includes('%')) {
            styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
        }else {
            styL = +sty.left.replace(/\px/g, '')
            styT = +sty.top.replace(/\px/g, '')
        }
        
        document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离 
            const l = e.clientX - disX
            const t = e.clientY - disY

            // 移动当前元素  
            dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${t + styT}px`

            //将此时的位置传出去
            //binding.value({x:e.pageX,y:e.pageY})
        }

        document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
        }
    }  
}
})
function clone(obj) {//深度复制对象
    // Handle the 3 simple types, and null or undefined or function
        if (null == obj || "object" != typeof obj) return obj;
    
        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
    }
    // Handle Array or Object
    if (obj instanceof Array | obj instanceof Object) {
        var copy = (obj instanceof Array)?[]:{};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to clone obj! Its type isn't supported.");
}
export{
    formatDate,
    getCookie,
    setCookie,
    axiosParams,
    axiosRequest ,
    goHome,
    clone,
}
