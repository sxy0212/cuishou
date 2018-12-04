<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
		<el-form-item label="催收区域">
			<el-select v-model="formInline.region" placeholder="活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委托方">
			<el-select v-model="formInline.region" placeholder="活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="案件类型">
			<el-select v-model="formInline.region" placeholder="活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="案件等级">
			<el-select v-model="formInline.region" placeholder="活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
        <el-form-item>
            <el-button type="primary" size="mini" plain @click='addFn(true)'>搜索</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
export default {
    name:'formDataMan',
    props:[
        'formInline'
    ]
    
}
</script>

