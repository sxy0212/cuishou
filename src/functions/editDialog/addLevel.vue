<template>
    <div>
        <div>
            <el-form :model="formTitle">
                <el-form-item label="等级名称" :label-width="formLabelWidth">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="方案设置" :label-width="formLabelWidth">
                </el-form-item>
                <el-form-item label="本人电话" :label-width="formLabelWidth">
                    <el-radio v-model="formTitle.self_phone_status" label="1">接通</el-radio>
                    <el-radio v-model="formTitle.self_phone_status" label="-1">未接通</el-radio>
                </el-form-item>
                <el-form-item label="第一联系人" :label-width="formLabelWidth">
                    <el-radio v-model="formTitle.first_contact_phone_status" label="1">接通</el-radio>
                    <el-radio v-model="formTitle.first_contact_phone_status" label="-1">未接通</el-radio>
                </el-form-item>
                <el-form-item label="第二联系人" :label-width="formLabelWidth">
                    <el-radio v-model="formTitle.second_contact_phone_status" label="1">接通</el-radio>
                    <el-radio v-model="formTitle.second_contact_phone_status" label="-1">未接通</el-radio>
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
        'formTitle'
    ],
    data() {
        return{
            formLabelWidth:"100px"
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
            if( this.title == '等级添加' ){
                url = '/api/api_backend.php?r=system-setting/case-level-add'
            }else if( this.title == "等级编辑" ){
                url = '/api/api_backend.php?r=system-setting/case-level-edit'
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

