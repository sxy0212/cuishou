<template>
    <el-form :inline="true" :model="formFirst" class="demo-form-inline">   
		<el-form-item label="姓名">
			<el-input v-model="formFirst.case_name" placeholder="请输入姓名"></el-input>
		</el-form-item>
		<el-form-item label="联系方式">
			<el-input v-model="formFirst.case_mobile" placeholder="请输入联系方式"></el-input>
		</el-form-item>
		<el-form-item label="证件号">
			<el-input v-model="formFirst.case_id_num" placeholder="请输入证件号"></el-input>
		</el-form-item>
		<el-form-item label="案件状态">
			<el-select v-model="formFirst.case_status" placeholder="案件状态">
				<el-option label="正常状态" value="0"></el-option>
				<el-option label="暂停" value="1"></el-option>
                <el-option label="关闭" value="2"></el-option>
                <el-option label="退安" value="3"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委托方">
			<el-select v-model="formFirst.case_client" placeholder="委托方">
				<el-option 
                    v-for="item in clientList"
                    :label="item.batch_name" 
                    :value="item.batch_id"
                    :key='item.batch_id'
                ></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委案时间">
			<el-date-picker
                v-model="formFirst.case_date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
		</el-form-item>
		<el-form-item label="退案时间">
            <el-date-picker
                v-model="formFirst.case_back_date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
		</el-form-item>
		<el-form-item label="委案金额">
			<el-input v-model="formFirst.case_money" placeholder="请输入委案金额"></el-input>
		</el-form-item>
		<el-form-item label="案件id">
			<el-input v-model="formFirst.user" placeholder="请输入案件id"></el-input>
		</el-form-item>
		<el-form-item label="案件等级">
			<el-select v-model="formFirst.case_level" placeholder="案件等级">
				<el-option 
                    v-for='item in levelList'
                    :key='item.id'
                    :label='item.name'
                    :value='item.id'
                ></el-option>
			</el-select>
		</el-form-item>
        <el-form-item label="部门">
            <el-select v-model="formFirst.case_client" placeholder="请选择部门">
				<el-option 
                    v-for="item in departmentList"
                    :label="item.true_name" 
                    :value="item.id"
                    :key='item.id'
                ></el-option>
			</el-select>
        </el-form-item>
        <el-form-item label="催收员">
            <el-select v-model="formFirst.region" placeholder="催收员">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属批次">
            <el-select v-model="formFirst.region" placeholder="所属批次">
                <el-option 
                    v-for="item in batchList"
                    :key='item'
                    :label="item" 
                    :value="item"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标色搜索">
            <el-select v-model="formFirst.region" placeholder="标色搜索">
                <el-option label="玫红色" value="0"></el-option>
                <el-option label="天蓝色" value="1"></el-option>
                <el-option label="紫红色" value="2"></el-option>
                <el-option label="翠绿色" value="3"></el-option>
                <el-option label="紫色" value="4"></el-option>
                <el-option label="棕色" value="5"></el-option>
                <el-option label="蓝色" value="6"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="最后跟进">
            <el-date-picker
                v-model="formFirst.case_last_collection_date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="关键词：">
            <el-input v-model="formFirst.key" placeholder="请输入关键词"></el-input>
        </el-form-item>
	</el-form>
</template>
<script>

export default {
    name:'formCaseFirst',
    props:[
        'formFirst',
        'levelList',
        'batchList',
        'departmentList',
        'clientList',
    ]
}
</script>
<style>
.el-date-editor .el-range-separator,.el-date-editor .el-range__icon{line-height:24px;}
</style>




    