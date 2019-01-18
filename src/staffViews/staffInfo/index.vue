<template>
    <div>
        <div>催收员：{{info.staff}}</div>
        <div>登陆吗：{{info.user_name}}</div>
        <div>编号{{info.staff_id}}</div>
        <div>真实姓名：{{info.true_name}}</div>
        <div>部门编号：{{info.department_id}}</div>
        <div>机构编号：{{info.company_id}}</div>
        <div>分机号：{{info.extension}}</div>
    </div>
</template>

<script>
import {axiosRequest, message } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    data(){
        return{
            info:{}
        }
    },      
    beforeMount() {
        const  conf = {
            url:"/api/api_staff.php?r=login/info",
            success:(data)=>{
                if( data.statusCode == 1 ){
                    if( !!this.info ){
                        this.info = data.info
                    }else{
                        message(data)
                    }
                    
                }else if( data.statusCode == 0 ){
                    Message({
                        message: data.message,
                        type: 'erro',
                        duration: 3 * 1000
                    })
                }
            }
        }
        axiosRequest(conf)
    },
}
</script>
