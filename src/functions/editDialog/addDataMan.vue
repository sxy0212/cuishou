<template>
    <div>
        <el-form :model="formTitle" v-if="formShow">
            <el-form-item label="批次名称" label-width="70px">
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
            <el-form-item label="备注" label-width="70px">
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
            :action="action"
            :data="data"
            :on-success="successFn"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
        >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button v-show="formShow" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
            <el-button v-show="!formShow" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定追加</el-button>
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
        'clientList',
        'action'
    ],
    computed:{
        formShow(){
            return this.title=='导入资料'
        },
        data(){
            if(this.formShow){
                return  this.formTitle
            }else{
                let obj = {}
                obj['batch_id'] = this.id
                return obj
            }
                    
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
        successFn(res,file, fileList) {
            if(res.statusCode == 1){
                this.$emit('changeAddNow',false)
                this.$emit('init')
                Message({
                    message: res.message,
                    type: 'success',
                    duration: 3 * 1000
                })
            }else{
                Message({
                    message: res.message,
                    type: 'erro',
                    duration: 3 * 1000
                })
            }
        },
        
    }
}
</script>
<style>

</style>


