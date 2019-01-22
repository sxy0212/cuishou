<template>
    <div class="NaveTab">
        <el-tabs v-model="staffActive" type="card" closable  @tab-click="tabClick" v-if="options.length"   @tab-remove="tabRemove">
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
    data () {
        return {
            
        }   
    },
    mounted() {
        console.log(store)
    },
    methods: {
        tabClick (tab) {
            let path = this.staffActive;
            console.log(path)
            if(this.staffActive === '/dashboard') {
               // path = this.staffActive + '/' + this.$store.state.userInfo.name; 
            }
            this.$router.push({path:path});
        },
        tabRemove (targetName) {
            if( targetName == '/dashboard' ) {
                return
            }
            store.commit('del_staff_tabs',targetName);
            if( this.staffActive === targetName ) {
                if( store && this.options.length >= 1 ) {
                    store.commit('set_staff_active', this.options[this.options.length-1].route);
                    this.$router.push({path: this.staffActive});
                }else {
                    this.$router.push({path: '/dashboard'});
                }
            }
        }
    },
    computed: {
        options () {
            return store.state.staffOptions;
        },
        staffActive: {
            get () {
                return store.state.staffActive;
            },
            set ( val ) {
                store.commit('set_staff_active', val);
            }
        }
    },
    watch: {
        '$route' (to) {
            let flag = false;
            for(let option of this.options ) {
                if(option.name === to.name ) {
                    flag = true ;
                    store.commit('set_staff_active', '/' + to.path.split('/')[1]);
                    break
                }
            }
            if(!flag) {
                store.commit('add_staff_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
                store.commit('set_staff_active', '/' + to.path.split('/')[1]);
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
