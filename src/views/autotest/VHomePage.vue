<template>
  <v-app>
    <fieldset>
      <legend>品牌</legend>
      <!-- <label max-width="100" >品牌</label> -->
      <div class="container">
        <v-flex v-for="equip in equip_type_list" :key="equip.type">
          <div>
            <input type="checkbox" id="a" :name="equip.type" />
            <label for="a">{{ equip.type }}</label>
          </div>
        </v-flex>
      </div>

      <!-- <v-flex v-for="equip in equip_type_list" :key="equip.type">
        <v-checkbox class="v-label" v-model="required" :label="equip.type"></v-checkbox>
      </v-flex> -->
    </fieldset>

    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.id">
          <v-hover>
            <v-card @click.native="getReportDetail(item)" class="mx-auto" color="grey lighten-4" min-width="100" max-width="200" slot-scope="{ hover }" hover>
              <v-img :aspect-ratio="7 / 14" :src="coverImgUrl">
                <v-btn v-if="item.task_start_time == 0" class="green white--text font-weight-black">
                  空闲
                </v-btn>
                <v-btn v-else class="gray black--text font-weight-black">
                  离线
                </v-btn>
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item.device_info["ro.product.marketname"] }}
                </div>
              </v-card-text>
              <div class="container" style="position: relative;">
                <v-btn class="blue font-weight-black" @click.native="taskStart(item)">
                  使用
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import Snackbar from "../../components/snackbar/index";

export default {
  data() {
    return {
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
    taskStart(item) {
      console.log("post task start");
      Vue.prototype.$http
        .post("http://192.168.50.72:4399/taskStart", { serialno: [item.serialno], playerid: 4063618 })
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "启动设备成功";
            // this.items = response.data.msg

            // console.log(response);
            // console.log(this.items);
            Snackbar.info(this.message);
          } else {
            this.message =
              "启动设备失败，原因为" + response.data.msg;
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
        .post("http://192.168.50.72:4399/deviceList")
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取设备列表成功";
            if (response.data.msg.length > 0) {
              this.items = response.data.msg;
            }
            // console.log(response);
            // console.log(this.items);
            Snackbar.info(this.message);
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
    getReportDetail(item) {
      console.log("item1");
      console.log(item);
      this.$router.push({ name: "facilityDetail", query: { item: JSON.stringify(item) } });
      // window.location.href = "detail?id=" + id;
    }
  },
  mounted() {
    console.log("mounted");
    this.getItemList();
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
