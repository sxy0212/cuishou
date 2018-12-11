<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="分配案件：">
            <el-button type="primary" @click="searchFn" size="mini">快速分配</el-button>
            <el-button type="info" @click="searchFn" size="mini">手动分配</el-button>
        </el-form-item>
        <el-form-item label="案件操作：">
            <el-button type="primary" @click="pauseFn('1')" size="mini">暂停案件</el-button>
            <el-button type="info" @click="pauseFn('2')" size="mini">关闭案件</el-button>
            <el-button type="primary" @click="pauseFn('3')" size="mini">退案</el-button>
            <el-button type="info" @click="pauseFn('0')" size="mini">恢复案件</el-button>
            <el-button type="info" @click="changeArea" size="mini">修改催收区域</el-button>
        </el-form-item>
        <el-form-item label="导出操作：">
            <el-button type="primary" @click="searchFn" size="mini">导出查询结果</el-button>
            <el-button type="info" @click="searchFn" size="mini">导出所选案件</el-button>
            <el-button type="primary" @click="searchFn" size="mini">导出所选电话</el-button>
            <el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
        </el-form-item>
        <el-form-item label="案件标色：" class="colorCover">
            <el-button type="info" 
             v-for='item in colorList'
                :key='item.id'
                :class="item.class"
                @click="searchFn" size="medium"></el-button>
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
                    class:'zero',
                    code:'0',
                },
                {
                    class:'one',
                    code:'1',
                },
                {
                    class:'two',
                    code:'2',
                },
                {
                    class:'three',
                    code:'3',  
                },
                {
                    class:'four',
                    code:'4',  
                },
                {
                    class:'five',
                    code:'5',  
                },
                {
                    class:'six',
                    code:'6',  
                },
            ]
        }
    },
    methods:{
        searchFn(){

        },
        changeArea(){
            this.$emit('changeArea')
        },
        pauseFn(val){
            this.$emit('pauseFn',val)
        }
    }
}
</script>
<style>
.demo-box.demo-tag .el-tag+.el-tag{margin-left:10px}.demo-box.demo-tag .button-new-tag{margin-left:10px;height:32px;line-height:30px;padding-top:0;padding-bottom:0}.demo-box.demo-tag .input-new-tag{width:90px;margin-left:10px;vertical-align:bottom}
.zero{background-color:white;border-color:white;}
.one{background-color:rgba(255, 51, 255, 1);
    border-color:rgba(255, 51, 255, 1);}
.two{background-color: rgba(0, 204, 255, 1);border-color: rgba(0, 204, 255, 1);}
.three{background-color:rgba(128, 0, 128, 1);border-color:rgba(128, 0, 128, 1);}
.four{background-color:rgba(0, 204, 0, 1);border-color:rgba(0, 204, 0, 1);}
.five{background-color:rgba(102, 51, 0, 1);border-color:rgba(102, 51, 0, 1);}
.six{background-color:rgba(255, 204, 0, 1);border-color:rgba(255, 204, 0, 1);}
.demoSpan{width:20px;height:20px;}
.colorCover .zero:hover,.colorCover .zero:active,.colorCover .zero:focus{background-color:white; border-color:white;}
.colorCover .one:hover,.colorCover .one:active,.colorCover .one:focus{background-color:rgba(255, 51, 255, 1); border-color:rgba(255, 51, 255, 1);}
.colorCover .two:hover,.colorCover .two:active,.colorCover .two:focus{background-color: rgba(0, 204, 255, 1);border-color: rgba(0, 204, 255, 1);}
.colorCover .three:hover,.colorCover .three:active,.colorCover .three:focus{background-color:rgba(128, 0, 128, 1);border-color:rgba(128, 0, 128, 1);}
.colorCover .four:hover,.colorCover .four:active,.colorCover .four:focus{background-color:rgba(0, 204, 0, 1);border-color:rgba(0, 204, 0, 1);}
.colorCover .five:hover,.colorCover .five:active,.colorCover .five:focus{background-color:rgba(102, 51, 0, 1);border-color:rgba(102, 51, 0, 1);}
.colorCover .six:hover,.colorCover .six:active,.colorCover .six:focus{background-color:rgba(255, 204, 0, 1);border-color:rgba(255, 204, 0, 1);}
</style>




    