<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="分配案件：">
            <el-button type="primary" @click="sureToDistribute(2)" size="mini">快速分配</el-button>
            <el-button type="info" @click="distributeFn()" size="mini">手动分配</el-button>
        </el-form-item>
        <el-form-item label="案件操作：">
            <el-button type="primary" @click="pauseFn('1')" size="mini">暂停案件</el-button>
            <el-button type="info" @click="pauseFn('2')" size="mini">关闭案件</el-button>
            <el-button type="primary" @click="pauseFn('3')" size="mini">退案</el-button>
            <el-button type="info" @click="pauseFn('0')" size="mini">恢复案件</el-button>
            <el-button type="info" @click="changeArea" size="mini">修改催收区域</el-button>
        </el-form-item>
        <el-form-item label="导出操作：">
            <el-button type="primary" @click="exportFn" size="mini">导出查询结果</el-button>
            <el-button type="info" @click="exportChoosen" size="mini">导出所选案件</el-button>
            <el-button type="primary" @click="exportTel" size="mini">导出所选电话</el-button>
            <el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
        </el-form-item>
        <el-form-item label="案件标色：" class="colorCover">
            <el-button type="info" 
                v-for='item in colorList'
                :key='item.code'
                :class="item.class"
                @click="colorChange(item.code)" size="medium"></el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import '@/styles/css/otherFormCaseSecond.css'
export default {
    name:'formCaseSecond',
    props:[
        'form',
        'colorList',
    ],
    data(){
        return {
           
        }
    },
    methods:{
        searchFn(){

        },
        colorChange(val){
            this.$emit('colorChange',val)
        },
        changeArea(){
            this.$emit('changeArea')
        },
        pauseFn(val){
            this.$emit('pauseFn',val)
        },
        distributeFn(){
            this.$emit('distributeFn')
        },
        sureToDistribute(val){
            this.$emit('sureToDistribute',val)
        },
        exportFn(){
            this.$emit('exportFn')
        },
        exportChoosen(){
            this.$emit('exportChoosen')
        },
        exportTel(){
            this.$emit('exportTel')
        }
    }
}
</script>




    