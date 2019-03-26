<template>
    <div>
        <div>
            <el-form :model="passwordObj">
                <el-form-item label="旧密码：" label-width="100px">
                    <el-input  type="password" v-model="passwordObj.old_password" autocomplete="off" placeholder='请输入旧密码'></el-input>
                </el-form-item>
                 <el-form-item label="新密码：" label-width="100px">
                    <el-input  type="password" v-model="passwordObj.password" autocomplete="off" placeholder='请输入密码'></el-input>
                </el-form-item>
                 <el-form-item label="确认密码：" label-width="100px">
                    <el-input type="password" v-model="passwordObj.confirm_pwd" autocomplete="off" placeholder='请再次输入密码'></el-input>
                </el-form-item>
            </el-form>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="protectFn">保存</el-button>
            <el-button  @click="cancelFn">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'addChangePassword',
    props:[
        'passwordObj',
    ],
    data(){
        return{

        }
    },
    methods:{
        protectFn(){
            this.$emit('protectFn')
        },
        cancelFn(){
            this.$emit('cancelFn')
        }
    }

}
</script>

