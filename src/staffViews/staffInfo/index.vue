<template>
    <div>
        <h2>欢迎{{info.user_name}}的登陆!</h2>
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
<style scoped>
h2{padding:20px;}
</style>

