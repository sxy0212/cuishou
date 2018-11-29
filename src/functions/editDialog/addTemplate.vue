<template>
    <div>
        <div>
            <el-form :model="formTitle">
                <el-form-item label="模板名称" :label-width="formLabelWidth">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择字段" :label-width="formLabelWidth">
                    <el-checkbox v-model="formTitle.num1" disabled>备选项1</el-checkbox>
                    <el-checkbox v-model="formTitle.num2" disabled>备选项</el-checkbox>
                    <el-checkbox v-model="formTitle.num3" >备选项</el-checkbox>
                    <el-checkbox v-model="formTitle.num4" >备选项</el-checkbox>
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
            if( this.title == '模板添加' ){
                url = '/api/api_backend.php?r=system-setting/template-add'
            }else if( this.title == "模板编辑" ){
                url = '/api/api_backend.php?r=system-setting/template-edit'
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

