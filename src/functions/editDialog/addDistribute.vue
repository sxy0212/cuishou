<template>
    <div>
        <div>
            <div>可分配的数量为：{{ableNum}}条</div>
             <el-form :model="formDistribute">
                <el-form-item label="分配的数量" label-width="100px">
                    <el-input type='number' v-model="formDistribute.split_num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-select v-model="formDistribute.depart_id" @change="changeFn" placeholder="请选择部门">
                        <el-option
                            v-for="item in departmentList"
                            :key="item.id"
                            :label="item.depart_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="催收员" label-width="100px">
                    <el-select v-model="formDistribute.staff" placeholder="催收员">
                        <el-option
                            v-for="item in staffList"
                            :key="item.id"
                            :label="item.true_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button @click="sureToDistribute">确定分配</el-button>
            <el-button type="primary" @click="cancelDistribute">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'addDistribute',
    props:[
        'formDistribute',
        'departmentList',
        'ableNum',
        'staffList'
    ],
    methods:{
        changeFn(val){
            this.$emit('changeFn',val)
            this.$emit('getDepartmentList',2)
        },
        sureToDistribute(){
            this.$emit('sureToDistribute',1)
        },
        cancelDistribute(){
            this.$emit('cancelDistribute')
        }
    }
    
}
</script>

