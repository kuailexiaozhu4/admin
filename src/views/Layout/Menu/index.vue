<template>
  <!--左侧导航 -->
  <el-menu :default-active="$route.path"
           active-text-color="#1e78bf"
           background-color="#112f50"
           class="el-menu-vertical-demo"
           router
           text-color="#fff">
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/info">
      <i class="el-icon-document"></i>
      <span slot="title">疫苗信息</span>
    </el-menu-item>
    <el-submenu index="/booking">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span slot="title">疫苗预约管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/booking/approval">疫苗审批</el-menu-item>
        <el-menu-item index="/booking/notice">接种提醒</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/feedback">
      <i class="el-icon-message"></i>
      <span slot="title">留观及问题反馈</span>
    </el-menu-item>
    <!--    <el-menu-item index="/user">-->
    <!--      <i class="el-icon-user"></i>-->
    <!--      <span slot="title">用户管理</span>-->
    <!--    </el-menu-item>-->
    <!--    <el-menu-item index="/person">-->
    <!--      <i class="el-icon-user"></i>-->
    <!--      <span slot="title">个人中心</span>-->
    <!--    </el-menu-item>-->
    <el-submenu index="/system">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/system/logger">系统日志</el-menu-item>
        <el-menu-item index="/system/publish">增加疫苗种类</el-menu-item>
        <el-menu-item index="/system/person">增加制药厂</el-menu-item>
        <el-menu-item index="/system/person">个人中心</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  border: none;
}
</style>