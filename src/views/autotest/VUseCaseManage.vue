<template>
  <v-app>
    <v-btn class="blue font-weight-black" @click.native="uploadUseCase()">
      上传测试用例
    </v-btn>
    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.id">
          <v-hover>
            <v-card @click.native="getUseCaseDetail(item)" class="mx-auto" color="grey lighten-4" min-width="100"
              max-width="200" slot-scope="{ hover }" hover>
              <v-img :aspect-ratio="15 / 14" :src="coverImgUrl">
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item }}
                </div>
              </v-card-text>
              <div class="container" style="position: relative;">
                <v-btn class="blue font-weight-black" @click.native="deleteIt(item)">
                  删除
                </v-btn>
              </div>
            </v-card>
          </v-hover>
          <v-dialog v-model="dialog" max-width="500">
            <v-card class="elevation-16 mx-auto" width="500">
              <v-card-title class="headline" primary-title>删除用例</v-card-title>
              <v-card-text>确定删除该用例吗？</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="primary" text @click="dialog = false">取消</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deleteUseCase(item)">确定</v-btn>
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

export default {
  inject: ['reload'],
  data() {
    return {
      dialog: false,
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
      coverImgUrl: '../phone/347756.jpg',
      removeItem: null,
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
    deleteIt(item) {
      this.removeItem = item;
      this.dialog = true;
    },
    deleteUseCase() {
      this.dialog = false;
      console.log("post delete item:", this.removeItem);
      Vue.prototype.$http
        .post("http://192.168.50.78:4399/removeUseCase", { useCase: this.removeItem })
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200 && response.data.msg.success == true) {
            this.message = "删除用例成功";
            Snackbar.info(this.message);
            this.reload();
          } else {
            this.message =
              "删除用例失败，原因为" + response.data.msg.err;
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
        .post("http://192.168.50.78:4399/showUseCase")
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.status == 200) {
            this.message = "获取用例列表成功";
            Snackbar.info(this.message);
            this.items = response.data.msg;
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
    getUseCaseDetail(item) {
      //   console.log("item1");
      //   console.log(item);
      //   this.$router.push({ name: "facilityDetail", query: { item: JSON.stringify(item) } });
      // window.location.href = "detail?id=" + id;
    },
    uploadUseCase() {
      this.$router.push({ name: "uploadTestCase" });
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
