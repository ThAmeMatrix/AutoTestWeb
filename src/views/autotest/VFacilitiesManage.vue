<template>
  <v-app>
    <!-- <fieldset>
      <legend>品牌</legend>
      <div class="container">
        <v-flex v-for="equip in equip_type_list" :key="equip.type">
          <div>
            <input type="checkbox" id="a" :name="equip.type" />
            <label for="a">{{ equip.type }}</label>
          </div>
        </v-flex>
      </div>
    </fieldset> -->

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
                <v-btn v-else-if="item.task_pause == true" class="gray black--text font-weight-black">
                  暂停
                </v-btn>
                <v-btn v-else class="orange black--text font-weight-black">
                  执行
                </v-btn>
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item.device_info["ro.product.marketname"] }}
                </div>
                <div class="title font-weight-light black--text mb-1">{{ item.serialno }}
                </div>
              </v-card-text>
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
    getItemList() {
      console.log("post get item list");
      this.$http4399
        .post("/deviceList")
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取设备列表成功";
            Snackbar.info(this.message);
            this.items = response.data.msg;
            // console.log(response);
            // console.log(this.items);
            
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
      this.requestSlave(item);

      // console.log("item1");
      // console.log(item);
      // this.$router.push({ name: "facilityDetail", query: { item: JSON.stringify(item), serialno: item.serialno } });
      // this.$router.push({ name: "facilityDetail", query: { serialno: item.serialno } });
      // window.location.href = "detail?id=" + id;
    },
    requestSlave(item) {
      console.log("post request slave minicap port: %d", item.minicap_port);
      this.$http8088
        .post("/", {minicap_port: 1717, serialno: item.serialno})
        .then(response => {
          console.log("request slave");
          console.log(response);
          if (response.status == 200) {
            this.$router.push({ name: "facilityDetail", query: { serialno: item.serialno } });
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
