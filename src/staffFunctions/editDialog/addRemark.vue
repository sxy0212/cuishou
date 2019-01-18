<template>
    <div>
        <div>
            <el-form :model="formRemark">
                <el-form-item :label="remarkLabel" label-width="100px">
                    <el-input  type="textarea" v-model="formRemark.remark" autocomplete="off" placeholder='请输入备注'></el-input>
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
export default {
    name:'addRemark',
    props:[
        'formRemark',
        'remarkLabel',

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

