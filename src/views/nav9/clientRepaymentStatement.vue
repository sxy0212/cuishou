<template>
    <section>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
		<el-form-item label="催收区域:">
			<el-select v-model="formInline.collection_area" placeholder="请选择催收区域">
				<el-option label="西安" value="1"></el-option>
				<el-option label="北京" value="2"></el-option>
				<el-option label="上海" value="3"></el-option>
				<el-option label="合肥" value="4"></el-option>
				<el-option label="安徽" value="5"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委托方:">
			<el-select v-model="formInline.client" placeholder="请选择委托方">
				<el-option label="中国银行" value="1"></el-option>
				<el-option label="中国人寿" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="还款日期:">
			<el-date-picker
                v-model="formInline.date"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
		</el-form-item>
		<el-form-item>
            <el-button type="primary"  plain >开始统计</el-button>
            <el-button type="primary"  plain >导出报表</el-button>
        </el-form-item>
	</el-form>
    <el-table :data="tableData6" border show-summary style="width: 100%">
        <el-table-column prop="id" label="委托方" width="110"></el-table-column>
        <el-table-column prop="name" label="催收区域" width="100"></el-table-column>
        <el-table-column prop="amount1" label="2018-12-01"></el-table-column>
        <el-table-column prop="amount2" label="2018-12-02"></el-table-column>
        <el-table-column prop="amount3" label="2018-12-03"></el-table-column>
        <el-table-column prop="amount4" label="2018-12-04"></el-table-column>
        <el-table-column prop="amount5" label="2018-12-05"></el-table-column>
        <el-table-column prop="amount6" label="2018-12-06"></el-table-column>
        <el-table-column prop="amount7" label="2018-12-07"></el-table-column>
        <el-table-column prop="amount8" label="2018-12-08"></el-table-column>
        <el-table-column prop="amount9" label="2018-12-09"></el-table-column>
        <el-table-column prop="amount10" label="2018-12-10"></el-table-column>
    </el-table>
    </section>
   
</template>
<script>
import {axiosRequest,message} from '@/assets/js/Yt.js'
export default {
    data(){
        return{
            formInline:{
                collection_area:"",
                client:"",
                date:""
            },
            tableData6: [{
                id: '51信用卡',
                name: '合肥',
                amount1: 234,
                amount2: 3.2,
                amount3: 95,
                amount4: 28,
                amount5: 15,
                amount6: 11,
                amount7: 9,
                amount8: 12,
                amount9: 19,
                amount10: 17,
                }, {
                id: '51信用卡',
                name: '合肥',
                amount1: 234,
                amount2: 3.2,
                amount3: 16,
                amount4: 12,
                amount5: 11,
                amount6: 16,
                amount7: 19,
                amount8: 25,
                amount9: 29,
                amount10: 36,
                }, {
                id: '51信用卡',
                name: '安徽',
                amount1: 23,
                amount2: 3.2,
                amount3: 10,
                amount4: 19,
                amount5: 10,
                amount6: 12,
                amount7: 99,
                amount8: 12,
                amount9: 10,
                amount10: 17,
                }, {
                id: '51信用卡',
                name: '北京',
                amount1: '234',
                amount2: '3.2',
                amount3: 10,
                amount4: 10,
                amount5: 10,
                amount6: 10,
                amount7: 10,
                amount8: 10,
                amount9: 10,
                amount10: 10,
                }, {
                id: '51信用卡',
                name: '上海',
                amount1: 234,
                amount2: 3.2,
                amount3: 3,
                amount4: 11,
                amount5: 12,
                amount6: 94,
                amount7: 12,
                amount8: 5,
                amount9: 9,
                amount10: 3,
            }]
        }
    },
    methods:{
        saveFn(){
            
        }
    }
}
</script>

