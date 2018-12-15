<template>
    <div>
        <div>
            <div class="ableDis">可分配的数量为：{{formDistribute.case_all_num}}条</div>
             <el-form :model="formDistribute">
                <el-form-item label="分配的数量" label-width="100px">
                    <el-input type='number' v-model="formDistribute.split_num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="100px">
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
                    <el-checkbox-group v-model="formDistribute.staff" @change="changeStaff">
                        <el-checkbox 
                            v-for="item in this.staffList" 
                            :label="item.true_name" 
                            :key="item.id"
                        >{{item.true_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureToDistribute">确定分配</el-button>
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
        'staffList'
    ],
    methods:{
        changeFn(val){
            this.$emit('changeFn',val)
        },
        sureToDistribute(){
            this.$emit('sureToDistribute',1)
        },
        cancelDistribute(){
            this.$emit('cancelDistribute')
        },
        changeStaff(value){
            console.log(value,this.formDistribute)
        }
    }
    
}
</script>
<style scoped>
.ableDis{font-size:18px;line-height:40px;}
</style>


