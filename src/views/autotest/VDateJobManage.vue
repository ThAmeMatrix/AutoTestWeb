<template>
  <v-app>
    <v-btn class="blue font-weight-black" @click.native="dialog3 = true">
      新增定时任务
    </v-btn>
    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.id">
          <v-hover>
            <v-card class="mx-auto" color="grey lighten-4" min-width="100" max-width="400" slot-scope="{ hover }" hover>
              <v-img :aspect-ratio="15 / 14" :src="coverImgUrl">
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item.nameID }}
                </div>
              </v-card-text>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">执行时间：<br>{{ item.next_run_time }}
                </div>
              </v-card-text>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">设备名：<br>{{ item.serialno }}
                </div>
              </v-card-text>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">用例：<br>{{ item.useCase }}
                </div>
              </v-card-text>
              <div class="container" style="position: relative;">
                <v-btn class="blue font-weight-black" @click.native="dialog = true">
                  删除
                </v-btn>
              </div>
            </v-card>
          </v-hover>


          <v-dialog v-model="dialog" max-width="500">
            <v-card class="elevation-16 mx-auto" width="500">
              <v-card-title class="headline" primary-title>删除定时任务</v-card-title>
              <v-card-text>确定删除该定时任务吗？</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="primary" text @click="dialog = false">取消</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deleteDateJob(item)">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog3" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">创建定时任务</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="addDateJobName" label="输入定时任务名字*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="tempSerialnoList" label="设备serialno*" outlined readonly></v-text-field>
                      <v-btn @click="dialog4 = true">
                        <v-icon>add</v-icon>
                        增加设备
                      </v-btn>
                      <v-text-field v-model="tempUseCaseList" label="用例*" readonly></v-text-field>
                      <v-btn @click="dialog5 = true">
                        <v-icon>add</v-icon>
                        增加用例
                      </v-btn>
                      <v-text-field v-model="date3" label="运行时间*" readonly></v-text-field>
                      <datetime-picker :datetime.sync="date3" :is-show.sync="showDate3"></datetime-picker>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*：必填项</small>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="cancelCreate()">关闭</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="saveCreate()">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog4" max-width="500px">
            <v-card>
              <v-card-title>增加设备</v-card-title>
              <v-card-text>
                <!-- <v-btn color="primary" dark @click="dialog3 = !dialog3">创建新歌单</v-btn> -->
                <v-select :items="SerialnoList" label="选择设备" item-value="text" @change="curSelectSerialno"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="dialog4 = false">关闭</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="addSerialno()">增加</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog5" max-width="500px">
            <v-card>
              <v-card-title>增加用例</v-card-title>
              <v-card-text>
                <!-- <v-btn color="primary" dark @click="dialog3 = !dialog3">创建新歌单</v-btn> -->
                <v-select :items="UseCaseList" label="选择用例" item-value="text" @change="curSelectUseCase"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="dialog5 = false">关闭</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="addUseCase()">增加</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog6" max-width="500px">
            <v-card>
              <v-card-title>错误</v-card-title>
              <v-card-text>
                {{ errorStr }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="dialog6 = false">关闭</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog6 = false">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import Snackbar from "../../components/snackbar/index";

Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

import DateTimePicker from "@/components/VDateTimePicker.vue";

export default {
  components: {
    'datetime-picker': DateTimePicker,
  },
  data() {
    return {
      showDate3: true,
      date3: new Date().format("yyyy-MM-dd hh:mm:ss"),

      errorStr: '',
      tempSerialnoList: [],
      tempUseCaseList: [],
      SerialnoList: [],
      UseCaseList: [],
      selectedSerialno: '',
      selectedUseCase: '',
      addDateJobName: '',
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      selectedFacility: null,
      message: "",
      equip_type_list: [
        {
          type: "HUAWEI",
        },
        {
          type: "MEIZU",
        }
      ],
      coverImgUrl: '../phone/phone.jpg',
      items: [
        {
          id: 1,
          serialno: '8py5obyteanrug9t',
          device_info: {
            'ro.product.marketname': 'HUAWEI P10 Plus',
          },
          name: "M2 E",
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵111',
          online: true,
        },
        {
          id: 2,
          name: "HUAWEI P10 Plus",
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵',
          online: true,
        },
        {
          id: 3,
          name: "iphone X",
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵',
          online: true,
        },
        {
          id: 4,
          name: "Honor 7",
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵',
          online: false,
        },
      ],
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  },
  created: () => { },
  methods: {
    curSelectSerialno(val) {
      console.log(val);
      this.selectedSerialno = val;
    },
    curSelectUseCase(val) {
      console.log(val);
      this.selectedUseCase = val;
    },
    getSerialnoList() {
      console.log("post get serialno list");
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/deviceList")
        .then(response => {
          console.log("deviceList");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取设备列表成功";
            Snackbar.info(this.message);
            this.SerialnoList = [];
            for (let i = 0; i < response.data.msg.length; i++) {
              this.SerialnoList.push(response.data.msg[i].serialno);
            }
            console.log("tempList");
            console.log(this.SerialnoList);
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
    getUseCaseList() {
      console.log("post get use case list");
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/showUseCase")
        .then(response => {
          console.log("showUseCase");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取用例列表成功";
            Snackbar.info(this.message);
            this.UseCaseList = response.data.msg;
          } else {
            this.message =
              "获取用例列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getItemList() {
      console.log("post get item list");
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/getJobList")
        .then(response => {
          console.log("getJobList");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取定时任务列表成功";
            Snackbar.info(this.message);
            this.items = response.data.msg;
          } else {
            this.message =
              "获取定时任务列表失败，原因为" + response.data.code;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getReportDetail(item) {
      // console.log("item1");
      // console.log(item);
      // this.$router.push({ name: "facilityDetail", query: { item: JSON.stringify(item), serialno: item.serialno } });
      this.$router.push({ name: "facilityDetail", query: { serialno: item.serialno } });
      // window.location.href = "detail?id=" + id;
    },
    addSerialno() {
      if (this.tempSerialnoList.indexOf(this.selectedSerialno) > -1) {
        this.errorStr = '该设备已存在！';
        this.dialog6 = true;
        return;
      }
      this.dialog4 = false;
      this.tempSerialnoList.push(this.selectedSerialno);
    },
    addUseCase() {
      if (this.tempUseCaseList.indexOf(this.selectedUseCase) > -1) {
        this.errorStr = '该用例已存在！';
        this.dialog6 = true;
        return;
      }
      this.dialog5 = false;
      this.tempUseCaseList.push(this.selectedUseCase);
    },
    deleteDateJob(item) {
      console.log("remove date job: %s", item.nameID);
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/removeJob", { nameID: item.nameID})
        .then(response => {
          console.log("removeJob");
          console.log(response);
          if (response.status == 200) {
            this.message = "删除定时任务成功";
            Snackbar.info(this.message);
            this.reload();
          } else {
            this.message =
              "删除定时任务失败，原因为" + response.data.msg.err;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    saveCreate() {
      if (this.addDateJobName == '') {
        this.errorStr = '请输入定时任务名字！';
        this.dialog6 = true;
        return;
      }
      if (this.tempSerialnoList.length == 0) {
        this.errorStr = '设备列表不能为空！';
        this.dialog6 = true;
        return;
      }
      if (this.tempUseCaseList.length == 0) {
        this.errorStr = '用例列表不能为空！';
        this.dialog6 = true;
        return;
      }

      console.log("datetime");
      console.log(this.date3);

      Vue.prototype.$http
        .post("http://192.168.50.78:4399/addDateJob", { nameID: this.addDateJobName, serialno: this.tempSerialnoList, useCase: this.tempUseCaseList, runDate: this.date3 })
        .then(response => {
          console.log("getJobList");
          console.log(response);
          if (response.status == 200 && response.data.msg.success == true) {
            this.message = "添加定时任务成功";
            Snackbar.info(this.message);
            this.dialog3 = false;
            this.reload();
          } else {
            this.message =
              "添加定时任务失败，原因为" + response.data.msg.err;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    cancelCreate() {
      this.dialog3 = false;
      this.tempSerialnoList = [];
      this.tempUseCaseList = [];
    },
  },
  mounted() {
    console.log("mounted");

    // 获取定时任务列表
    this.getItemList();

    // 获取设备列表
    this.getSerialnoList();

    // 获取用例列表
    this.getUseCaseList();
  }
}
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
</style>

<style lang="scss" scoped>
fieldset {
  width: 200px;

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
