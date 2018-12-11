<template>
    <div>
        <div>
            <el-form :model="formTitle">
                <el-form-item label="区域名称" :label-width="formLabelWidth">
                    <el-select 
                        v-model='formTitle.id' 
                        placeholder="请选择区域"
                    >
                        <el-option
                            v-for="item in areaList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
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
    name:'addChangeArea',
    data(){
        return{
            formLabelWidth:'120px'
        }
    },
    props:[
        'formTitle',
        'areaList'
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

