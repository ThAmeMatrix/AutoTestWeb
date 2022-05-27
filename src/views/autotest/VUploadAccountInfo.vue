<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-btn @click="upload" depressed>
          Upload Player Data
        </v-btn>
        <input name="file" type="file" id="upload" ref="upload" multiple="multiple" @change="addFile" accept=".bin">
        <!-- <button @click="uploadTitle()">上传文件</button> -->
        <v-btn class="blue font-weight-black" @click.native="uploadTitle()">
          上传文件
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import Snackbar from "../../components/snackbar/index";

export default {
  data() {
    return {
      formData: new FormData(),
    }
  },
  methods: {
    addFile(event) {
      // 通过DOM取文件数据
      let inputDOM = this.$refs.upload;
      this.fil = inputDOM.files;
      this.formData.append("file", this.fil[0]);
    },
    uploadTitle() {
      if (!this.fil) {
        this.$message.warning("请选择文件");
      } else {
        return new Promise((resolve) => {
          console.log(this.formData)
          let config = {
            //添加请求头
            headers: { "Content-Type": "multipart/form-data" },
          };
          this.$http4399
            .post("/uploadPlayerData", this.formData, config)
            .then(response => {
              console.log("response");
              console.log(response);
              if (response.status == 200) {
                this.message = "上传角色数据成功";
                // this.items = response.data.msg

                // this.items = response.data.data;
                // console.log(response);
                // console.log(this.items);
                Snackbar.info(this.message);
              } else {
                this.message =
                  "上传角色数据失败，原因为" + response.data.data.errMsg;
                Snackbar.error(this.message);
              }
            })
            .catch(error => {
              Snackbar.error(error);
            });
        })
      }
    },
    upload() {
      let uploadbtn = this.$refs.upload
      uploadbtn.click()
    }
  }
}
</script>
 
<!-- <style scoped>
#upload {
  height: 0;
  width: 0;
  visibility: hidden;
}
</style> -->