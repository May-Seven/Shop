<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 警告区 -->
      <el-alert
        show-icon
        title="注意！只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类-->
      <el-row>
        <el-col class="cat_opt">
          <span>选择商品分类</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="catelist"
            :props="cateProps"
            v-model="selectedCatekeys"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- Tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数 -->
        <el-tab-pane label="动态参数" name="first">
          <!-- 添加参数按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtndisable"
            >添加参数</el-button
          >
        </el-tab-pane>
        <!-- 添加静态属性 -->
        <el-tab-pane label="静态属性" name="second">
          <!-- 添加属性按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtndisable"
            >添加属性</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 级联双向绑定的数组
      selectedCatekeys: [],
      // 被激活的页签
      activeName: "first"
    };
  },
  created() {
    this.getCateList();
  },

  methods: {
    // 获取所有商品分类
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200)
        return this.$message.error("获取商品分类失败！");
      this.catelist = res.data;
    },
    // 级联选择框中项变化会触发的函数
    handleChange() {
      if (this.selectedCatekeys.length !== 3)
        return (this.selectedCatekeys = []);
      console.log(this.selectedCatekeys);
    },
    // Tab标签点击处理函数
    handleTabClick() {
      console.log(this.activeName);
    }
  },
  computed: {
    // 按钮禁用
    isBtndisable() {
      if (this.selectedCatekeys.length !== 3) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
