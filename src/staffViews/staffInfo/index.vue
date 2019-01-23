<template>
    <div>
        <h2>欢迎{{trueName}}的登陆!</h2>
    </div>
</template>

<script>
import store from '@/vuex/store.js'
import {axiosRequest, message } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    computed: {
        trueName () {
            return store.state.staffInfo.true_name
        },
    },     
}
</script>
<style scoped>
h2{padding:20px;}
</style>

