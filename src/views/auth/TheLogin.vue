<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>用户登录</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn icon large :href="source" target="_blank" slot="activator">
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="userInfo.account"
                    prepend-icon="person"
                    :rules="commonRules"
                    name="account"
                    label="账号"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="userInfo.password"
                    prepend-icon="lock"
                    name="password"
                    :rules="commonRules"
                    label="密码"
                    id="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" class="white--text" @click="register">注册</v-btn>
                <v-btn color="primary" @click="login">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Vue from "vue";
import Snackbar from "../../components/snackbar/index";

export default {
  data() {
    return {
      message: "",
      userInfo: {
        account: "",
        password: ""
      },
      commonRules: [v => !!v || "请输入"],
      currentYear: new Date().getFullYear(),
      showPwd: false,
    };
  },
  methods: {
    register() {
      this.$router.push({ name: "Register" });
    },
    login() {
      // this.$router.push({ name: "Index" });
      Vue.prototype.$http
      .post("http://localhost:5000/user/login", this.userInfo)
      .then(response => {
        if (response.data.status == "success") {
          // 存储登陆信息在客户端浏览器中
          let userFullInfo = response.data.data;
          localStorage.setItem("LOGIN_USER", JSON.stringify(userFullInfo));

          this.message = "登陆成功";
          Snackbar.success(this.message);
          this.$router.push({ name: "Index" });
          /*             // 定时跳转页面
          setTimeout(() => {
            window.location.href = "/dashboard";
            //  this.$router.push({ name: "Index" });
          }, 1500); */
        } else {
          this.message = "登陆失败，原因为" + response.data.data.errMsg;
          Snackbar.error(this.message);
        }
      })
      .catch(error => {
        console.log(error);
        Snackbar.error(error);
      });
    }
  }
};
</script>
