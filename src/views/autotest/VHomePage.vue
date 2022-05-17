<template>
  <v-app>
    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.id">
          <v-hover>
            <v-card class="mx-auto" color="grey lighten-4" min-width="300" max-width="380" slot-scope="{ hover }" hover>
              <v-img :aspect-ratio="15 / 14" :src="item.coverImgUrl">
                <v-expand-transition>
                  <div class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;" v-if="hover">
                    <ul>
                      <!-- <li v-for="singer in item.singers" :key="singer"> -->
                      <div style="font-size: 18px; color: white; overflow: hidden;">
                        <!-- {{ singer }} -->
                        {{ item.description }}
                      </div>
                      <!-- </li> -->
                    </ul>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item.name }}</div>
                <v-icon color="blue darken-2">message</v-icon>
                <b style="font-size: 22px;">{{ item.playCount }}</b>
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
      items: [
        {
          id: 1,
          name: "M2 E",
          coverImgUrl: 'https://p2.music.126.net/Kkmr7ucNWGtRmoCDR8RcAA==/109951163264683832.jpg',
          description: '呵呵呵呵呵呵',
          playCount: 123,
        }
      ],
    }
  },
  created: () => { },
  method: {
    getPlayList() {

    }
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