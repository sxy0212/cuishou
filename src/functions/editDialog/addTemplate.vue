<template>
    <div>
        <div>
            <el-form :model="formTitle">
                <el-form-item label="模板名称" label-width="80px">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择字段" label-width="80px">
                    <el-checkbox v-model="item.choose"
                        v-for="item in this.fieldsList"
                        :key="item.id"
                        :class="item.is_required =='1'?'red':''">
                        {{item.field_name}}
                    </el-checkbox>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="protectFn">保存</el-button>
            <el-button  @click="cancelFn">取消</el-button>
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
        'formTitle',//表单
        'fieldsList'//多选选项
    ],
    methods:{
        cancelFn(){//更改菜单标题
            this.$emit("addNowChange",false)
            this.$emit("clearFormTitle")
        },
        protectFn(){
            this.formTitle.fields = this.fieldsList.map(item=>{
                if(item.choose == true){
                    return item.id
                }
            }).join(",")
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
<style>
.red .el-checkbox__label{color:red;}
.el-checkbox {    margin-left: 30px;}
</style>


