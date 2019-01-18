<template>
    <div class="formCaseCss">
        <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="案件操作：">
                <el-button type="primary" @click="pauseFn('1')" size="mini">暂停案件</el-button>
                <el-button type="primary" @click="pauseFn('2')" size="mini">关闭案件</el-button>
                <el-button type="primary" @click="pauseFn('3')" size="mini">退案</el-button>
                <el-button type="primary" @click="pauseFn('0')" size="mini">恢复案件</el-button>
                <el-button type="primary" @click="changeArea" size="mini">修改催收区域</el-button>
            </el-form-item>
            <el-form-item label="导出操作：">
                <el-button type="primary" @click="exportFn" size="mini">导出查询结果</el-button>
                <el-button type="primary" @click="exportChoosen" size="mini">导出所选案件</el-button>
                <el-button type="primary" @click="exportTel" size="mini">导出所选电话</el-button>
                <el-button type="primary" @click="exportHistory" size="mini">导出催收记录</el-button>
            </el-form-item>
            <el-form-item label="案件标色：" class="colorCover">
                <el-button 
                    v-for='item in colorList'
                    :key='item.code'
                    :class="item.class"
                    @click="colorChange(item.code)" size="medium"></el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>
<script>

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
        exportFn(){
            this.$emit('exportFn')
        },
        exportChoosen(){
            this.$emit('exportChoosen')
        },
        exportTel(){
            this.$emit('exportTel')
        },
        exportHistory(){
            this.$emit('exportHistory')
        }
    }
}
</script>
<style scoped>
.formCaseCss .demo-box.demo-tag .el-tag+.el-tag{margin-left:10px}.demo-box.demo-tag .button-new-tag{margin-left:10px;height:32px;line-height:30px;padding-top:0;padding-bottom:0}.demo-box.demo-tag .input-new-tag{width:90px;margin-left:10px;vertical-align:bottom}
.formCaseCss  .el-form-item__content .one{background-color:white;border-color:white;}
.formCaseCss .el-form-item__content .two{background-color:#00CC99; border-color:#00CC99;}
.formCaseCss .el-form-item__content .three{background-color: #0099FF;border-color: #0099FF;}
.formCaseCss .el-form-item__content .four{background-color:#6633FF;border-color:#6633FF;}
.formCaseCss .el-form-item__content .five{background-color:#CC0033;border-color:#CC0033;}
.formCaseCss .el-form-item__content .six{background-color:#FF9966;border-color:#FF9966;}
.formCaseCss .el-form-item__content .seven{background-color:#990000;border-color:#990000;}
.formCaseCss .demoSpan{width:20px;height:20px;}
.formCaseCss .colorCover .one:hover,.colorCover .one:active,.colorCover .one:focus{background-color:white; border-color:white;}
.formCaseCss .colorCover .two:hover,.colorCover .two:active,.colorCover .two:focus{background-color:#00CC99; border-color:#00CC99;}
.formCaseCss .colorCover .three:hover,.colorCover .three:active,.colorCover .three:focus{background-color: #0099FF;border-color: #0099FF;}
.formCaseCss .colorCover .four:hover,.colorCover .four:active,.colorCover .four:focus{background-color:#6633FF;border-color:#6633FF;}
.formCaseCss .colorCover .five:hover,.colorCover .five:active,.colorCover .five:focus{background-color:#CC0033;border-color:#CC0033;}
.formCaseCss .colorCover .six:hover,.colorCover .six:active,.colorCover .six:focus{background-color:#FF9966;border-color:#FF9966;}
.formCaseCss .colorCover .seven:hover,.colorCover .seven:active,.colorCover .seven:focus{background-color:#990000;border-color:#990000;}
.formCaseCss .blueB .el-form-item{margin-bottom:0;}

</style>




    