import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
     options: [],
     activeIndex: '/index',
     userInfo: {},
     menuIndex: '0'
  },
  mutations : {
      add_tabs (state,data) {
         this.state.options.push(data);
      },
      save_index(state, data){
         this.state.menuIndex=data?data:'0';
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
         this.state.activeIndex = index;
      },
       // 设置详情信息
       save_detail_info (state, info) {
         this.state.userInfo = info;
     }
  }
});


export default store