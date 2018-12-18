<template>
    <div>
        <div>
            <div class="ableDis">可分配的数量为：{{ableNum}}条</div>
             <el-form :model="formDistribute">
                <el-form-item label="分配的数量" label-width="100px">
                    <el-input type='number' v-model="formDistribute.split_num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="100px">
                    <el-select v-model="formDistribute.depart_id" @change="getStaffFn" placeholder="请选择部门">
                        <el-option
                            v-for="item in departmentList"
                            :class="item.class_name"
                            :key="item.id"
                            :label="item.depart_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="催收员" label-width="100px">
                    <el-checkbox-group v-model="formDistribute.staff" v-if="staffList.length">
                        <el-checkbox 
                            v-for="item in staffList" 
                            :label="item.true_name" 
                            :key="item.id"
                            :value='item.id'
                        >{{item.true_name}}</el-checkbox>
                    </el-checkbox-group>
                    <span v-else >暂无催收员！请先选择部门</span>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureToDistribute(1)">确定分配</el-button>
            <el-button  @click="cancelDistribute">取消</el-button>
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
        getStaffFn(val){
            this.$emit('getStaffFn',val)
        },
        sureToDistribute(val){
            this.$emit('sureToDistribute',val)
        },
        cancelDistribute(){
            this.$emit('cancelDistribute')
        },
    }
    
}
</script>
<style scoped>
.ableDis{font-size:18px;line-height:40px;}
</style>


