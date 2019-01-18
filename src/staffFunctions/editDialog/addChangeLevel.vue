<template>
    <div>
        <div>
            <el-form :model="formLevel">
                <el-form-item label="等级" label-width="60px">
                    <el-select 
                        v-model='formLevel.case_level' 
                        placeholder="请选择等级"
                    >
                        <el-option
                            v-for="item in levelList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
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
    name:'addChangeLevel',
    props:[
        'levelList',
        'formLevel'
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

