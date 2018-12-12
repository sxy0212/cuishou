import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store =  new Vuex.Store({
    modules:{

    },
    state: {
        options: [],
        activeIndex: '/charts',
        userInfo: {},
        menuIndex: '0',
        caseBatchId:'',//案件管理当前批次
        menusList:''//侧边连数据
    },
    mutations : {
        add_tabs (state,data) {
            if(data.name != ""){
                state.options.push(data) 
            }
        },
        save_index(state, data){
            state.menuIndex=data?data:'0';
        },
        del_tabs (state,route) {
            let index = 0;
            for (let option of state.options) {
                if(option.route === route){
                    break;
                }
                index++;
            }
            this.state.options.splice(index, 1);
        },
        set_active_index (state, index) {
            state.activeIndex = index;
        },
        save_detail_info (state, info) {// 设置详情信息
            state.userInfo = info;
        },
        changeBatchId( state, info ){
            state.caseBatchId = info
        },
        clearOptions( state ){//退出登录时，清空tab框
            state.options = []
        }
        
    }
})


export default store