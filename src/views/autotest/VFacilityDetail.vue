<template>
  <v-container fluid grid-list-xl>
    <!-- <div class="iframediv">
      <iframe :src="src" ref="iframe"></iframe>
    </div> -->
    <v-layout>
      <!-- 卡片-设备详情 -->
      <v-flex xs7>
        <v-hover>
          <v-card class="mx-auto" color="grey lighten-4" min-width="300" max-width="680">
            <v-hover>
              <div class="iframediv">
                <iframe :src="src" ref="iframe"></iframe>
              </div>
              <!-- <v-img :aspect-ratio="16 / 14" :src="coverImgUrl">
              </v-img> -->
            </v-hover>
            <v-card-text class="pt-4" style="position: relative;">
              <v-list-tile class="grow">
                <v-btn @click="dialog2 = true" absolute class="white--text" color="blue" large top left
                  title="Run Use Case">
                  <v-icon>add</v-icon>
                  执行用例
                </v-btn>
                <v-btn @click="taskSuspend()" absolute class="white--text" color="red" large top right
                  title="Rate the music">
                  <v-icon>star</v-icon>
                  暂停任务
                </v-btn>
              </v-list-tile>
              <v-list-tile class="grow">
                <v-btn @click="taskResume()" absolute class="white--text" color="blue" large top left
                  title="Run Use Case">
                  <v-icon>add</v-icon>
                  继续任务
                </v-btn>
                <v-btn @click="taskTerminate()" absolute class="white--text" color="red" large top right
                  title="Rate the music">
                  <v-icon>star</v-icon>
                  停止任务
                </v-btn>
              </v-list-tile>
              <h3 class="display-1 font-weight-light black--text mb-2">
                {{ this.item.device_info["ro.product.marketname"] }}</h3>
              <div class="font-weight-light grey--text title mb-2">
                serialno：{{ this.serialno }}
              </div>
              <div class="font-weight-light title mb-2">
                状态：{{ status }}
                <br />
                执行用例：{{ nowRunUseCase }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>



      <v-dialog v-model="dialog" max-width="500">
        <v-card class="elevation-16 mx-auto" width="500">
          <v-card-title class="headline" primary-title>测试123</v-card-title>
          <v-card-text>
            <div class="text-xs-center mt-5">
              <v-rating v-model="rate.rating" color="yellow darken-3" background-color="grey darken-1"
                empty-icon="star_border" half-increments></v-rating>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false">关闭</v-btn>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" text @click="rateit">保存</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" max-width="500px">
        <v-card>
          <v-card-title>任务执行</v-card-title>
          <v-card-text>
            <v-select :items="select" label="选择用例" item-value="text" @change="curSelectUseCase"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog2 = false">关闭</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="taskStart()">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- <v-btn icon>
        <v-icon>link</v-icon>
      </v-btn> -->

      <!-- 卡片-评论列表 -->
      <v-flex xs5>
        <div id="e3" style="max-width: 600px; margin: auto;" class="grey lighten-3">
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>报告</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn> -->
          </v-toolbar>
        </div>

        <v-flex v-for="report in reports" :key="item">
          <v-hover>
            <v-card @click="getReportDetail(report)" class="mx-auto" color="grey lighten-4" slot-scope="{ hover }"
              hover>
              <div class="container">
                <v-img :aspect-ratio="7 / 7" min-width="60" max-width="60" :src="reportImgUrl">
                </v-img>
                <div class="title font-weight-light black--text mb-1">{{ report }}
                </div>
                <!-- <v-card-text style="position: relative;">
                  <div class="title font-weight-light black--text mb-1">{{ report }}
                  </div>
                </v-card-text> -->
              </div>
              <!-- <v-img :aspect-ratio="7 / 7" max-width="60" :src="reportImgUrl">
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ report }}
                </div>
              </v-card-text> -->
            </v-card>
          </v-hover>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import Snackbar from "../../components/snackbar/index";

function getParam(paramName) {
  // 解析 url 参数, 获取 qurey string
  let paramValue = "";
  let isFound = !1;
  if (
    window.location.search.indexOf("?") == 0 &&
    window.location.search.indexOf("=") > 1
  ) {
    let arrSource;
    let i;
    (arrSource = unescape(window.location.search)
      .substring(1, window.location.search.length)
      .split("&")),
      (i = 0);
    while (i < arrSource.length && !isFound)
      arrSource[i].indexOf("=") > 0 &&
        arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() &&
        ((paramValue = arrSource[i].split("=")[1]), (isFound = !0)),
        i++;
  }
  return paramValue == "" && (paramValue = null), paramValue;
}

export default {
  data() {
    return {
      src: "http://" + Vue.prototype.$host + ":9717/",
      status: "空闲",
      item: {},
      serialno: '',
      reportImgUrl: '../phone/1b86fce3_E377873_a1aed127.png',
      coverImgUrl: '../phone/phone.jpg',
      dialog: false,
      dialog2: false,
      notifications: false,
      sound: true,
      widgets: false,
      reports: [
        "2022_05_11_17_46_50",
        "2022_05_11_17_46_50",
        "2022_05_11_17_46_50",
        "2022_05_11_17_46_50",
        "2022_05_11_17_46_50",
      ],
      select: [
      ],
      selectedItem: '',
      nowRunUseCase: '',
      dialog: false,
      rate: {
        rating: 3
      },
      message: "",
      itemInfo: {
        musicid: "",
        musicname: "",
        commentsnum: "",
        albums: "",
        coverurl: ""
      },
      commentInfo: {
        itemId: "",
        title: "",
        content: ""
      },
      comments: {},
      commonRules: [v => !!v || "This is required"],

      msg: {},
    };
  },
  methods: {
    getStatus(task_pause, task_start_time) {
      console.log("task_pause")
      console.log(task_pause)
      console.log("task_start_time")
      console.log(task_start_time)
      if (task_start_time == 0) {
        this.status = "空闲";
      }
      else {
        if (task_pause == true) {
          this.status = "暂停";
        }
        else {
          this.status = "执行";
        }
      }
    },
    formatDate(timestamp) {
      var date = new Date(timestamp);
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getUseCaseList() {
      this.$http4399
        .post("/showUseCase")
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.message = "获取测试用例成功";
            this.select = response.data.msg;
            // this.items = response.data.data;
            Snackbar.info(this.message);
          } else {
            this.message = "获取测试用例失败，原因为" + response.data.msg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getReportList() {
      this.$http8000
        .post("/", { serialno: this.serialno })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.message = "获取报告成功";
            this.reports = response.data.msg;
            // this.items = response.data.data;
            Snackbar.info(this.message);
          } else {
            this.message = "获取报告失败，原因为" + response.data.msg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    curSelectUseCase(val) {
      console.log(val);
      this.selectedItem = val;
    },
    taskStart() {
      this.nowRunUseCase = this.selectedItem;
      this.dialog2 = false;
      console.log("post task start: " + this.serialno);
      this.$http4399
        .post("/taskStart", { useCase: [this.selectedItem], serialno: [this.serialno] })
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "设备执行任务成功";
            this.msg = response.data.msg;
            console.log(this.serialno)
            console.log(this.msg[this.serialno].success)
            if (this.msg[this.serialno].success == false) {
              this.message =
                "设备执行任务失败，原因为" + this.msg[this.serialno].errmsg;
              Snackbar.error(this.message);
              return;
            }
            else {
              this.message += "， errmsg：" + this.msg[this.serialno].errmsg;
              this.status = "执行";
            }

            Snackbar.info(this.message);
          } else {
            this.message =
              "设备执行任务失败，原因为" + response.data.msg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    taskSuspend() {
      this.testtext = 789;
      this.dialog2 = false;
      console.log("post task suspend: " + this.serialno);
      this.$http4399
        .post("/taskSuspend", { serialno: [this.serialno] })
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "设备暂停任务成功";
            this.msg = response.data.msg;
            console.log(this.serialno)
            console.log(this.msg[this.serialno].success)
            if (this.msg[this.serialno].success == false) {
              this.message =
                "设备暂停任务失败，原因为" + this.msg[this.serialno].errmsg;
              Snackbar.error(this.message);
              return;
            }
            else {
              this.message += "， errmsg：" + this.msg[this.serialno].errmsg;
              this.status = "暂停";
            }

            Snackbar.info(this.message);
          } else {
            this.message =
              "设备暂停任务失败，原因为" + response.data.msg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    taskTerminate() {
      this.nowRunUseCase = '';
      this.dialog2 = false;
      console.log("post task terminate: " + this.serialno);
      this.$http4399
        .post("/taskTerminate", { serialno: [this.serialno] })
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "设备停止任务成功";
            this.msg = response.data.msg;
            console.log(this.serialno)
            console.log(this.msg[this.serialno].success)
            if (this.msg[this.serialno].success == false) {
              this.message =
                "设备停止任务失败，原因为" + this.msg[this.serialno].errmsg;
              Snackbar.error(this.message);
              return;
            }
            else {
              this.message += "， errmsg：" + this.msg[this.serialno].errmsg;
              this.status = "空闲";
            }

            Snackbar.info(this.message);
          } else {
            this.message =
              "设备停止任务失败，原因为" + response.data.msg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    taskResume() {
      this.dialog2 = false;
      console.log("post task resume: " + this.serialno);
      this.$http4399
        .post("/taskResume", { serialno: [this.serialno] })
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "设备继续任务成功";
            this.msg = response.data.msg;
            console.log(this.serialno)
            console.log(this.msg[this.serialno].success)
            if (this.msg[this.serialno].success == false) {
              this.message =
                "设备继续任务失败，原因为" + this.msg[this.serialno].errmsg;
              Snackbar.error(this.message);
              return;
            }
            else {
              this.message += "， errmsg： " + this.msg[this.serialno].errmsg;
              this.status = "执行";
            }

            Snackbar.info(this.message);
          } else {
            this.message =
              "设备继续任务失败，原因为" + response.data.msg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getItem() {
      console.log("post get item list");
      this.$http4399
        .post("/deviceList")
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取设备列表成功";
            Snackbar.info(this.message);

            for (let i = 0; i < response.data.msg.length; i++) {
              if (response.data.msg[i].serialno == this.serialno) {
                this.item = response.data.msg[i];
                this.getStatus(this.item.task_pause, this.item.task_start_time);
                break;
              }
            }
          } else {
            this.message =
              "获取设备列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getReportDetail(report_name) {
      this.$router.push({ name: "reportDetail", query: { serialno: this.serialno, report_name: report_name } });
    },
    requestSlave() {
      console.log("post request slave minicap port: %d", item.minicap_port);
      this.$http8088
        .post("/", {minicap_port: 1717, serialno: this.item.serialno})
        .then(response => {
          console.log("request slave");
          console.log(response);
          if (response.status == 200) {
            // this.$router.push({ name: "facilityDetail", query: { serialno: this.item.serialno } });
            
            // this.message = "获取设备列表成功";
            // Snackbar.info(this.message);
            // this.items = response.data.msg;
            // console.log(response);
            // console.log(this.items);
            
          } else {
            this.message =
              "获取设备详情失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    todo() {
      Snackbar.info("开发中，请等待……");
    }
  },
  mounted() {
    this.serialno = getParam("serialno");
    console.log("serialno")
    console.log(this.serialno)
    this.getItem();

    // 获取用例
    this.getUseCaseList();

    // 获取报告
    this.getReportList();

    // let itemstr = getParam("item");
    // this.item = JSON.parse(itemstr);
    // this.serialno = this.item.serialno;
    // console.log("item2");
    // console.log(this.item);
  }
};
</script> 

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
}

.iframediv {
  width: 672px;
  height: 400px;
  margin: 0px auto;
  border: 10px dashed rgb(58, 58, 58);
  overflow: hidden;
}

.iframediv iframe {
  width: 1920px;
  height: 1080px;
  top: 0;
  left: 0;
  transform-origin: top left;
  transform: scale(0.35)
}
</style>