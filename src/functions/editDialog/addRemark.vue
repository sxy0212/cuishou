<template>
    <div>
        <div>
            <el-form :model="formRemark">
                <el-form-item label="备注" label-width="60px">
                    <el-input  type="textarea" v-model="formRemark.remark" autocomplete="off" placeholder='请输入备注'></el-input>
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
export default {
    name:'addRemark',
    props:[
        'formRemark',

    ],
    methods:{
        protectFn(){
            this.$emit('protectFn')
        },
        cancelFn(){
            this.$emit('cancelFn')
        }
    }

}
</script>

