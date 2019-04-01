<template>
    <div class="NaveTab">
        <el-tabs v-model="activeIndex" type="card" closable  @tab-click="tabClick" v-if="options.length"   @tab-remove="tabRemove">
            <el-tab-pane
              :key="index"
              v-for="(item,index) in options"
              :label="item.name"
              :name="item.route">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import store from '@/vuex/store.js'
export default {
    name: 'NaveTab',
    methods: {
        tabClick (tab) {
            let path = this.activeIndex;
            if(this.activeIndex === '/charts') {
               // path = this.activeIndex + '/' + this.$store.state.userInfo.name; 
            }
            this.$router.push({path:path});
        },
        tabRemove (targetName) {
            if(targetName == '/charts') {
                return
            }
            store.commit('del_tabs',targetName);
            if(this.activeIndex === targetName ) {
                if(store && this.options.length >= 1) {
                    store.commit('set_active_index', this.options[this.options.length-1].route);
                    this.$router.push({path: this.activeIndex});
                }else {
                    this.$router.push({path: '/charts'});
                }
            }
        }
    },
    computed: {
        options () {
            return store.state.options;
        },
        activeIndex: {
            get () {
                return store.state.activeIndex;
            },
            set ( val ) {
                store.commit('set_active_index', val);
            }
        }
    },
    watch: {
        '$route' (to) {
            let flag = false;
            for(let option of this.options ) {
                if(option.name === to.name ) {
                    flag = true ;
                    store.commit('set_active_index', '/' + to.path.split('/')[1]);
                    break
                }
            }
            if(!flag) {
                store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
                store.commit('set_active_index', '/' + to.path.split('/')[1]);
            }
        }
    }
}    
</script>

<style >
.NaveTab{ background: #fff; padding: 10px 20px;border-bottom: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);}
.NaveTab .el-tabs .el-tabs__header{
    border-bottom:none;
}
.NaveTab .el-tabs--card>.el-tabs__header .el-tabs__nav{border-bottom:1px solid #d8dce5}
</style>
