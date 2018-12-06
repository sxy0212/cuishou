<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="分配案件：">
            <el-button type="primary" @click="searchFn" size="mini">快速分配</el-button>
            <el-button type="info" @click="searchFn" size="mini">手动分配</el-button>
        </el-form-item>
        <el-form-item label="案件操作：">
            <el-button type="primary" @click="searchFn" size="mini">暂停案件</el-button>
            <el-button type="info" @click="searchFn" size="mini">关闭案件</el-button>
            <el-button type="primary" @click="searchFn" size="mini">退案</el-button>
            <el-button type="info" @click="searchFn" size="mini">恢复案件</el-button>
            <el-button type="info" @click="searchFn" size="mini">修改催收区域</el-button>
        </el-form-item>
        <el-form-item label="导出操作：">
            <el-button type="primary" @click="searchFn" size="mini">导出查询结果</el-button>
            <el-button type="info" @click="searchFn" size="mini">导出所选案件</el-button>
            <el-button type="primary" @click="searchFn" size="mini">导出所选电话</el-button>
            <el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
        </el-form-item>
        <el-form-item label="案件标色：">
            <div class='demo-block demo-box demo-zh-CN demo-tag'>
                <el-tag 
                v-for='item in colorList'
                :key='item.id'
            ></el-tag>
            </div>
            
        </el-form-item>
    </el-form>
</template>
<script>

export default {
    name:'formCaseSecond',
    props:[
        'form',
        
    ],
    data(){
        return {
            colorList:[
                {
                    class:'one',
                    color:'rgba(255, 51, 255, 1)' 
                },
                {
                    class:'two',
                    color:'rgba(0, 204, 255, 1)' 
                },
                {
                    class:'three',
                    color:'rgba(204, 51, 255, 1)' 
                },
                {
                    class:'four',
                    color:'rgba(0, 204, 0, 1)' 
                },
            ]
        }
    },
    methods:{
        searchFn(){

        }
    }
}
</script>
<style>
.demo-box.demo-tag .el-tag+.el-tag{margin-left:10px}.demo-box.demo-tag .button-new-tag{margin-left:10px;height:32px;line-height:30px;padding-top:0;padding-bottom:0}.demo-box.demo-tag .input-new-tag{width:90px;margin-left:10px;vertical-align:bottom}

</style>




    