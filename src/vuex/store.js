import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


import user from './modules/user' // 催收员
import getters from './getters' // 催收员
import router from '@/router.js'

const store =  new Vuex.Store({
    modules:{//催收员
        user
    },
    getters,//催收员
    state: {
        // 管理员
        options: [],
        activeIndex: '/charts',
        menuIndex: '0',
        
        // 催收员
        staffActive:'/dashboard',
        staffOptions:[],
        menuStaffIndex:'0'
    },
    mutations : {
        // 管理员
        add_tabs (state,data) {
            console.log(data)
            if(data.name != ""){
                state.options.push(data) 
            }
        },
        save_index(state, data){
            state.menuIndex=data?data:'0';
            console.log(router)
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
        clearOptions( state ){//退出登录时，清空tab框
            state.options = []
        },


        // 催收员
        set_staff_active (state, index) {
            state.staffActive = index;
        },
        del_staff_tabs (state,route) {
            let index = 0;
            for (let option of state.staffOptions) {
                if(option.route === route){
                    break;
                }
                index++;
            }
            this.state.staffOptions.splice(index, 1);
        },
        add_staff_tabs (state,data) {
            console.log(data)
            if(data.name != ""){
                state.staffOptions.push(data) 
            }
        },
        save_staff_index(state, data){
            state.menuStaffIndex=data?data:'0';
        },
        del_staff_tabs (state,route) {
            let index = 0;
            for (let option of state.staffOptions) {
                if(option.route === route){
                    break;
                }
                index++;
            }
            this.state.staffOptions.splice(index, 1);
        },
        clearStaffOptions( state ){//退出登录时，清空tab框
            state.staffOptions = []
        },
        
    }
})


export default store