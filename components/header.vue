<template>
  <header class="header">
    <el-row type="flex" justify="space-between" class="main">
      
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="https://img3.tuniucdn.com/u/mainpic/logo/logo_20170124.png" alt />
        </nuxt-link>
      </div>

      <!-- 导航栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录、注册用户信息 -->
      <el-row type="flex" align="middle">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width: 1000px;
    margin: 0 auto;
  }
  .logo {
    width: 156px;
    padding-top: 5px;
  }
  .navs {
    flex: 1;
    a {
      display: block;
      height: 60px;
      box-sizing: border-box;
      padding: 0 20px;

      &:hover {
        color: #409eff;
        border-bottom: 5px solid #409eff;
      }
    }
    .nuxt-link-exact-active {
    background-color: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
  }
  
}
img {
  display: block;
  width: 100%;
}
</style>

