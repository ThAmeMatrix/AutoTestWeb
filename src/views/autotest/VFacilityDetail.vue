<template>
  <v-container fluid grid-list-xl>
    <!-- <div class="iframediv">
      <iframe :src="src" ref="iframe"></iframe>
    </div> -->
    <!-- <aplayer :audio="audio" :lrcType="1" /> -->
    <v-layout>
      <!-- 卡片-设备详情 -->
      <v-flex xs7>
        <v-hover>
          <v-card class="mx-auto" color="grey lighten-4" min-width="300" max-width="580">
            <v-hover>
              <v-img :aspect-ratio="16 / 14" :src="coverImgUrl">
                <!-- <v-expand-transition>
                  <div class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;" v-if="hover">
                    <ul>
                      <li v-for="singer in itemInfo.singers" :key="singer">
                        <div style="font-size: 50px; color: white;">{{ singer }}</div>
                      </li>
                    </ul>
                  </div>
                </v-expand-transition> -->
              </v-img>
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
                <!-- <v-btn
                  @click="dialog = true"
                  absolute
                  class="white--text"
                  color="red"
                  fab
                  large
                  right
                  top
                  title="Rate the music"
                >
                  <v-icon>star</v-icon>
                </v-btn> -->
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
                <!-- <v-flex v-for="album in itemInfo.albums" :key="album">
                  <font style="font-size: 25px; color: black;">{{ album }}</font>
                </v-flex> -->
              </div>
              <div class="font-weight-light title mb-2">
                状态：{{ status }}
                <br />
                执行用例：{{ nowRunUseCase }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>

        <!-- <v-hover>
          <v-card class="mx-auto" color="grey lighten-4" min-width="300" max-width="680">
            <v-card-text class="pt-4" style="position: relative;">
              <div v-html="itemInfo.lrc"></div>
            </v-card-text>
          </v-card>
        </v-hover> -->
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
            <!-- <v-btn color="primary" dark @click="dialog3 = !dialog3">创建新歌单</v-btn> -->
            <v-select :items="select" label="选择用例" item-value="text" @change="curSelectUseCase"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog2 = false">关闭</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="taskStart()">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">创建歌单</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <!-- <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="输入歌单名字*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-textarea label="输入歌单描述" hint="请输入您对该歌单的描述信息"></v-textarea>
                </v-col>
              </v-row> -->
            </v-container>
            <small>*必填项</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog3 = false">关闭</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog3 = false">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn icon>
        <v-icon>link</v-icon>
      </v-btn>

      <!-- 卡片-评论列表 -->
      <v-flex xs5>
        <div id="e3" style="max-width: 600px; margin: auto;" class="grey lighten-3">
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>报告</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
        </div>

        <v-flex v-for="report in reports" :key="item">
          <v-hover>
            <v-card @click="getReportDetail(report)" class="mx-auto" color="grey lighten-4" slot-scope="{ hover }" hover>
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
      src: "http://192.168.50.78:9002/",
      status: "空闲",
      item: {},
      serialno: '',
      reportImgUrl: '../phone/1b86fce3_E377873_a1aed127.png',
      coverImgUrl: '../phone/phone.jpg',
      audio: {
        name: "",
        artist: "",
        url: "",
        cover: "",
        lrc: ""
        // name: "keep on",
        // artist: "前田愛",
        // url: "http://music.163.com/song/media/outer/url?id=619579.mp3",
        // cover:
        //   "http://p3.music.126.net/pU2Y4NTbyPj2jWvLHW4qhQ==/109951163626599907.jpg",
        // lrc:
        //   "[by:大熊猫啊]\n[00:38.00]不往後看地继续跑　Sunshine day\n[00:44.00]不屈服於膝盖擦伤的痛楚　Adventure\n[00:51.00]面对著　没有东西可害怕的　My future\n[00:57.00]那干渴的喉咙　给润湿了 因为有　Your smile\n[01:03.00]弱虫な自分に / 向那住在内心深处的　儒弱的自己\n[01:10.00]告别　说再见　令自己一点点地便得坚强\n[01:20.00]就是现在　持著勇气高飞\n[01:26.00]展开那心的翅膀　飞向未知的未来\n[01:32.00]从现在起　被带往那没尽头的宇宙\n[01:39.00]只是刚刚开始　奔向梦的冒险\n[01:46.00]la la la   la la la\n[01:52.00]la la la   la la la\n[02:00.00]抓著你的手　与你一起高飞　Blue sky height\n[02:07.00]你那明亮的声音和微笑是耀眼的　Paradise\n[02:14.00]在黑暗中　即使迷失　也不会放弃不会输\n[02:29.00]我知道我将会看到一线的光 我没有时间去挥洒我的眼泪！\n[02:33.00]即使是现在　我不会再挥洒我的眼泪\n[02:42.00]打开心的眼睛　向未知的未来进发\n[02:46.00]从现在起　我相信　我有力量\n[02:55.00]能再次站起来　就要持有勇气\n[02:59.00]la la la   la la la\n[03:05.00]la la la   la la la\n[03:26.00]如果低著头　垂下肩膀　是永远不会到达\n[03:33.00]那充满希望的　绝妙的终点\n[03:42.00]要继续跑　要继续挑战　就能变得更强！\n[03:53.00]就是现在　持著勇气高飞\n[03:59.00]展开心的翅膀　飞向未知的未来\n[04:05.00]从现在起　被带往那没尽头的宇宙\n[04:11.00]那只是刚刚开始　奔向梦的冒险\n[04:18.00]la la la   la la la\n[04:22.00]la la la   la la la\n[04:31.00]la la la   la la la\n[04:38.00]la la la   la la la\n"
      },
      dialog: false,
      dialog2: false,
      dialog3: false,
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
        // { text: "RAP" },
        // { text: "moemoe" },
        // { text: "情到深处" },
        // { text: "key" },
        // { text: "逗比歌单" },
        // { text: "狐妖小红娘" },
        // { text: "重启咲良田" },
        // { text: "寒蝉" },
        // { text: "素晴" },
        // { text: "everlasting song" }
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
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/showUseCase")
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
      Vue.prototype.$http
        .post("http://192.168.50.78:8000", {serialno: this.serialno})
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
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/taskStart", { playerid: 288489788, useCase: [this.selectedItem], serialno: [this.serialno] })
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
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/taskSuspend", { serialno: [this.serialno] })
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
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/taskTerminate", { serialno: [this.serialno] })
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
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/taskResume", { serialno: [this.serialno] })
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
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/deviceList")
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
  width: 1632px;
  height: 940px;
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
  transform: scale(0.85)
}
</style>