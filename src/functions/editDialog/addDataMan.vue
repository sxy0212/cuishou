<template>
    <div>
        <el-form :model="formTitle">
            <el-form-item label="批次名称" :label-width="formLabelWidth">
                <el-input v-model="formTitle.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="委托方">
                <el-select v-model="formTitle.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="催收区域">
                <el-select v-model="formTitle.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件类型">
                <el-select v-model="formTitle.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="formTitle.name" 
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
        </el-form>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
import { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    name:"addDataMan",
    props:[
        'id',
        'title',//用于判断添加还是编辑
        'formTitle',
        'fileList'
    ],
    data() {
        return{
            formLabelWidth:"70px"
        }
    },
    methods:{
        cancelFn(){//更改菜单标题
            this.$emit("addNowChange",false)
            this.$emit("clearFormTitle")
        },
        submitUpload(){
            this.$emit("submitUpload")
        },
        protectFn(){
            let data = this.formTitle
            let url 
            if( this.title == '区域添加' ){
                url = '/api/api_backend.php?r=system-setting/area-add'
            }else if( this.title == "区域编辑" ){
                url = '/api/api_backend.php?r=system-setting/area-edit'
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

</style>


