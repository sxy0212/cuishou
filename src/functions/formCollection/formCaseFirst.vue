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
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委托方">
			<el-select v-model="formFirst.case_client" placeholder="委托方">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委案时间">
			<el-select v-model="formFirst.case_date" placeholder="委案时间">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="退案时间">
			<el-select v-model="formFirst.case_back_date" placeholder="活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委案金额">
			<el-input v-model="formFirst.case_money" placeholder="请输入委案金额"></el-input>
		</el-form-item>
		<el-form-item label="案件id">
			<el-input v-model="formFirst.user" placeholder="请输入案件id"></el-input>
		</el-form-item>
		<el-form-item label="案件等级">
			<el-select v-model="formFirst.region" placeholder="案件等级">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
        <el-form-item label="部门">
            <el-select v-model="formFirst.region" placeholder="部门">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标色搜索">
            <el-select v-model="formFirst.region" placeholder="标色搜索">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="最后跟进">
            <el-select v-model="formFirst.region" placeholder="最后跟进">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
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
        'formFirst'
    ]
}
</script>



    