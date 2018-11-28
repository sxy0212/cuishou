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
            <el-button @click="cancelFn">保存</el-button>
            <el-button type="primary" @click="cancelFn">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"addArea",
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
            this.$emit("dialogVisibleChange")
            // 此处有个接口，用于传递名称

        }
    }
}
</script>

