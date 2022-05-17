<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>注册</v-toolbar-title>
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
                    v-model="userInfo.name"
                    prepend-icon="person"
                    name="name"
                    :rules="commonRules"
                    label="昵称"
                    id="name"
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
                  <v-text-field
                    v-model="userInfo.password"
                    prepend-icon="lock"
                    name="password"
                    :rules="commonRules"
                    label="再输入一次密码"
                    id="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="register">返回</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">注册</v-btn>
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
        telephone: "",
        otpCode: "",
        name: "",
        password: "",
        age: "",
        gender: "",
        avatar: ""
      },
      commonRules: [v => !!v || "请输入"],
      source: "https://github.com/ShiroCheng/spikeproject"
    };
  },
  methods: {
    getOtp() {
      Vue.prototype.$http
        .post("http://localhost:8088/user/getotp", this.userInfo)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "otp已发送到您的手机上，请注意查收";
            Snackbar.success(this.message);
          } else {
            this.message = "验证码发送失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.snackbar = true;
        });
    },
    register() {
      Vue.prototype.$http
        .post("http://localhost:8088/user/register", this.userInfo)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "注册成功, 正在跳转登陆界面...";
            Snackbar.success(this.message);
            this.$router.push({ name: "Login" });
          } else {
            this.message = "注册失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          console.log(error);
          Snackbar.error(error);
        })
        .finally(() => {
          //   this.snackbar = true;
        });
    }
  }
};
</script>