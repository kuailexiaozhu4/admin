<template>
  <div>
    <el-container>
      <!--   左侧   -->
      <el-aside width="200px">
        <manage-menu></manage-menu>
      </el-aside>
      <el-container>
        <!--   顶部     -->
        <el-header>
          <manage-header></manage-header>
        </el-header>
        <!--    内容    -->
        <el-main>
          <manage-content></manage-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ManageMenu from './Menu'
import ManageContent from './Content'
import ManageHeader from './Header'

export default {
  data() {
    return {}
  },
  methods: {},
  components: {
    ManageMenu,
    ManageContent,
    ManageHeader
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  height: 36px !important;
  color: #333;
}

.el-aside {
  overflow: hidden;
  border: none;
  color: #333;
  height: 100vh;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

</style>