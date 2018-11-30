<template> 
	<section>
		11111 {{newsID}}
		</section>
</template>

<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
import { MessageBox } from 'element-ui';
	export default {
		data() {
			return {
        newsID:""
      }
		},
		
		beforeMount() {
      this.newsID=this.$route.params && this.$route.params.id
			
    },
		methods: {
			// 页面机器人列表
		
		}
	}

</script>
<style lang="scss" scoped>
 @import '../../../static/css/taskManagement.scss'
</style>