<template>
  <v-app>
    <label max-width="100" >品牌</label>
    <v-flex v-for="equip in equip_type_list" :key="equip.type">
      <v-checkbox class="v-label" v-model="required" :label="equip.type"></v-checkbox>
    </v-flex>

    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.id">
          <v-hover>
            <v-card class="mx-auto" color="grey lighten-4" min-width="100" max-width="200" slot-scope="{ hover }" hover>
              <v-img :aspect-ratio="7 / 14" :src="item.coverImgUrl">
                <v-btn v-if="item.online==true" class="green white--text font-weight-black">
                  空闲
                </v-btn>
                <v-btn v-else class="gray black--text font-weight-black">
                  离线
                </v-btn>
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item.name }}</div>
              </v-card-text>
              <v-btn class="blue font-weight-black">
                使用
              </v-btn>
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
      equip_type_list: [
        {
          type: "HUAWEI",
        },
        {
          type: "MEIZU",
        }
      ],
      items: [
        {
          id: 1,
          name: "M2 E",
          // coverImgUrl: 'https://p2.music.126.net/Kkmr7ucNWGtRmoCDR8RcAA==/109951163264683832.jpg',
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵111',
          online : true,
        },
        {
          id: 2,
          name: "HUAWEI P10 Plus",
          // coverImgUrl: 'https://p2.music.126.net/Kkmr7ucNWGtRmoCDR8RcAA==/109951163264683832.jpg',
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵',
          online : true,
        },
        {
          id: 3,
          name: "iphone X",
          // coverImgUrl: 'https://p2.music.126.net/Kkmr7ucNWGtRmoCDR8RcAA==/109951163264683832.jpg',
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵',
          online : true,
        },
        {
          id: 4,
          name: "Honor 7",
          // coverImgUrl: 'https://p2.music.126.net/Kkmr7ucNWGtRmoCDR8RcAA==/109951163264683832.jpg',
          coverImgUrl: '../phone/phone.jpg',
          description: '呵呵呵呵呵呵',
          online : false,
        },
      ],
    }
  },
  created: () => { },
  method: {
    getPlayList() {

    },
  },
  mounted() {
    this.getPlayList();
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