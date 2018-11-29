<template>
    <div>
        <div>
             <el-form :model="formTitle">
                <el-form-item label="委托方名称" :label-width="formLabelWidth">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="编号前缀" :label-width="formLabelWidth">
                    <el-input v-model="formTitle.prefix" autocomplete="off"></el-input>
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
    name:"addClient",
    props:[
        'id',
        'title',//用于判断添加还是编辑
        'formTitle'
    ],
    data() {
        return{
            formLabelWidth:"120px"
        }
    },
    methods:{
        cancelFn(){//更改菜单标题
            this.$emit("addNowChange",false)
            this.$emit("clearFormTitle")
        },
        protectFn(){
            let data = this.formTitle
            let url 
            if( this.title == '委托方添加' ){
                url = '/api/api_backend.php?r=system-setting/commissioning-party-add'
            }else if( this.title == '委托方编辑' ){
                url = '/api/api_backend.php?r=system-setting/commissioning-party-edit'
                data.id = this.id
            }
            let conf = {
                url ,
                data,
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.cancelFn()
                        this.$emit('saveFn')
                        this.$emit('clearId')
                        this.$emit("clearFormTitle")
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

