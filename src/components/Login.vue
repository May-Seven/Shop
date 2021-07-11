<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 标题区域 -->
      <div class="avattar_box">
        <span>电商后台管理系统</span>
      </div>

      <!-- 登录表单区 -->
      <el-form
        :model="loginform"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        ref="loginformref"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-s-custom"
            v-model="loginform.username"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginform.password"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button
            :plain="true"
            type="primary"
            @click="login"
          >登录</el-button>
          <el-button
            type="info"
            @click="resetloginform"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginform: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetloginform() {
      this.$refs.loginformref.resetFields();
    },
    login() {
      this.$refs.loginformref.validate(async (val) => {
        if (!val) return;
        const { data: res } = await this.$http.post("login", this.loginform);
        if (res.meta.status !== 200) return this.$message.error("登录失败！");
        //弹框提示
        this.$message({
          message: "恭喜你，登录成功！",
          type: "success",
        });
        //将登录成功之后的token保存到客户端的sessionstorage中
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background: url(../assets/back.jpg) center top;
}
.login_box {
  width: 450px;
  height: 300px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(52, 64, 88, 0.9);
}
.avattar_box {
  text-align: center;
  width: 200px;
  color: #eee;
  font-size: 25px;
  margin: 30px auto;
  background: rgba(0, 0, 0, 0.1);
}
.btns {
  display: flex;
  justify-content: space-evenly;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
