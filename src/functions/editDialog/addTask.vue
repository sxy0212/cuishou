<template>
    <div>
        <div>
            <el-form :model="formTask">
                <el-form-item label="任务列表" label-width="100px">
                    <el-select 
                        v-model='formTask.value' 
                        placeholder="请选择任务"
                    >
                        <el-option
                            v-for="item in taskList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" label-width="100px">
                    <el-radio v-model="formTask.type" label="1">全部呼叫</el-radio>
                    <el-radio v-model="formTask.type" label="2">只呼叫未接通</el-radio>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureToAddTask">确认添加</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'addTask',
    props:[
      'formTask',
      'taskList',
    ],
    methods:{
        sureToAddTask(){
            this.$emit('sureToAddTask')
        },
    }
}
</script>

