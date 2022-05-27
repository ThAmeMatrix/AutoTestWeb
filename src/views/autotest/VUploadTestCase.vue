<template>
  <div>
    <v-btn class="blue font-weight-black" @click.native="manageUseCase()">
      管理测试用例
    </v-btn>
    注：上传的时候注意给测试用例改个自己能辨识的有意义的名字
    <excel-upload @update-filedata="val => (fileData = val)" />
    <!-- <button @click="uploadTitle()">上传文件</button> -->
    <v-btn class="blue font-weight-black" @click.native="uploadTitle()">
      上传文件
    </v-btn>
    <v-data-table v-if="fileData && fileData.headers" style="margin-top:20px;" :headers="tableData.headers"
      :items="tableData.data" class="elevation-1">
      <v-progress-linear slot="progress" color="blue" indeterminate />
      <template slot="items" slot-scope="props">
        <td v-for="(col, index) in tableData.headers" :key="index">{{ props.item[col.value] }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Vue from 'vue'
import Snackbar from "../../components/snackbar/index";
import ExcelUpload from "@/components/excel/ExcelUpload.vue";

export default {
  name: "ExcelUploadComponent",
  components: {
    ExcelUpload
  },
  data() {
    return {
      url: "",
      fileData: {},
      formData: new FormData(),
    };
  },
  methods: {
    manageUseCase() {
      this.$router.push({ name: "useCaseManage" });
    },
    uploadTitle() {
      console.log(this.fileData.file.name);
      this.fil = this.fileData.file;
      this.formData.append("file", this.fil);

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
            .post("/importUseCaseTxt", this.formData, config)
            .then(response => {
              console.log("response");
              console.log(response);
              if (response.status == 200) {
                this.message = "上传用例成功";
                Snackbar.info(this.message);
              } else {
                this.message =
                  "上传用例失败，原因为" + response.data.msg;
                Snackbar.error(this.message);
              }
            })
            .catch(error => {
              Snackbar.error(error);
            });
        })
      }
    },
  },
  computed: {
    tableData() {
      if (!this.fileData) {
        return {
          headers: [],
          data: [],
        };
      }

      const headers = [];
      const cols = this.fileData.headers || [];
      const rawData = this.fileData.data || [];

      for (let i = 0, len = cols.length; i < len; i += 1) {
        headers.push({
          text: cols[i],
          value: cols[i]
        });
      }

      return { headers, data: rawData };
    }
  },
};
</script>
