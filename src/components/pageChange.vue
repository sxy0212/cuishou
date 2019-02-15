<template>
  <div class="block" v-show="!!total">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name:"pageChange",
    props:[
      'total',
      'page',
      'page_size'
    ],
    methods: {
      handleSizeChange(val) {
        this.$emit('pageSizeChange',val)
      },
      handleCurrentChange(val) {
        this.$emit('currentPageChange',val)
      }
    },
    data() {
      return{

      }
    }
  }
</script>