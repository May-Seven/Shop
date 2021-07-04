<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/heima.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体 -->
      <el-container>
        <!-- 侧边 -->
        <el-aside :width="isCollapse ? '64px' :'200px'">
          <div class="toggle-button" @click="togleCollapse">|||</div>
          <el-menu text-color="#fff" background-color="#333744" 
          active-text-color="#409EFF" :unique-opened='true' 
          :collapse="isCollapse" :collapse-transition="false"
          :router='true'
          :default-active="activePath">
            <el-submenu  v-for='item in menulist' :key='item.id' :index="item.id+''">

              <!-- 一级菜单的模板 -->
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item v-for="subitem in item.children" 
              :key='subitem.id' :index="'/'+subitem.path" 
              @click="saveNavState('/'+subitem.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subitem.authName}}</span>
                </template>
              </el-menu-item>

            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return {
      menulist:[],
      iconsObj:{
        '125': 'el-icon-user-solid',
        '103': 'el-icon-set-up',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-shopping-cart-full',
        '145': 'el-icon-data-line'
      },
      isCollapse:false,
      activePath:''
    }
  },
  created(){
    this.getMenuList();
    this.activePath=window.sessionStorage.getItem('activePath');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },
    async getMenuList () {
      const {data:res}=await this.$http.get('menus');
      if(res.meta.status!==200)return this.message.error('res.meta.msg');
      this.menulist=res.data;
    },
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath=activePath;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right:none;
  }
}
el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
</style>
