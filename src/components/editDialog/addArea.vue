<template>
    <div>
        <div>
             <el-form :model="formTitle">
                <el-form-item label="区域名称" :label-width="formLabelWidth">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button @click="protectFn">保存</el-button>
            <el-button type="primary" @click="cancelFn">取消</el-button>
        </div>
    </div>
</template>
<script>
import { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    name:"addArea",
    prop:[
        'id'
    ],
    data() {
        return{
            formTitle:{
                name:''
            },
            formLabelWidth:"120px"
        }
    },
    methods:{
        cancelFn(){//更改菜单标题
            this.$emit("addNowChange",false)
            // 此处有个接口，用于传递名称
        },
        protectFn(){
            // let url,data
            console.log(this.id,typeof(this.id))
            let data = this.formTitle
            let conf = {
                url : '/api/api_backend.php?r=system-setting/area-add',
                data,
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.cancelFn()
                        this.$emit('saveFn')
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 3 * 1000
                        })
                    }else if(data.statusCode == 0){
                        Message({
                            message: data.message,
                            type: 'erro',
                            duration: 3 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        }
    }
}
</script>

