<template>
    <div>
        <el-form :model="formTitle">
            <el-form-item label="批次名称" :label-width="formLabelWidth">
                <el-input v-model="formTitle.batch_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="催收区域">
                <el-select v-model="formTitle.collection_area" placeholder="请选择催收区域">
                    <el-option 
                        v-for="item in areaList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="委托方">
                <el-select v-model="formTitle.client" placeholder="请选择委托方">
                    <el-option 
                        v-for="item in clientList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件类型">
                <el-select v-model="formTitle.case_type" placeholder="请选择案件类型">
                    <el-option 
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="formTitle.remark" 
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
        </el-form>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="/api/api_backend.php?r=asrcall-case-batch/import-batch"
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
        'fileList',
        'areaList',
        'typeList',
        'clientList'
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
            this.$refs.upload.submit()
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


