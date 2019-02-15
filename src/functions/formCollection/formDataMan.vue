<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
		<el-form-item label="催收区域:">
			<el-select v-model="formInline.collection_area" placeholder="请选择催收区域">
				<el-option 
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="委托方:">
			<el-select v-model="formInline.client" placeholder="请选择委托方">
				<el-option 
                    v-for="item in clientList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="案件类型:">
			<el-select v-model="formInline.case_type" placeholder="请选择案件类型">
				<el-option 
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
            <el-button type="primary" @click='addFn(true)'>搜索</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
export default {
    name:'formDataMan',
    props:[
        'formInline',
        'areaList',
        'typeList',
        'clientList'
    ],
    methods:{
        addFn(){
            this.$emit('addFn')
        }
    }
    
}
</script>

