<template>
  <v-app>
    <!-- <v-card-text>top 100 musics</v-card-text> -->
    <!-- <v-breadcrumbs :items="sites" divider="|"></v-breadcrumbs> -->
    <v-flex align-center xs6>
      <v-btn color="primary" @click="setPos(0)">网易云音乐</v-btn>
      <v-btn color="primary" @click="setPos(1)">虾米音乐</v-btn>
      <v-btn color="primary" @click="setPos(2)">QQ音乐</v-btn>
      <v-btn color="primary" @click="setPos(3)">酷狗音乐</v-btn>
      <v-btn color="primary" @click="setPos(4)">酷我音乐</v-btn>
      <v-btn color="primary" @click="setPos(5)">哔哩哔哩</v-btn>
      <v-btn color="primary" @click="setPos(6)">咪咕音乐</v-btn>
    </v-flex>
    <!-- <v-container fluid grid-list-xl> -->
    <!-- 卡片列表-商品概览 -->
    <!-- <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.musicid">
          <v-hover>
            <v-card
              @click.native="getItemDetail(item.musicid)"
              class="mx-auto"
              color="grey lighten-4"
              min-width="300"
              max-width="380"
            >
              <v-img :aspect-ratio="15/14" :src="item.coverurl">
                <v-expand-transition>
                  <div
                    class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                    v-if="hover"
                  >
                    <ul>
                      <li v-for="singer in item.singers" :key="singer">
                        <div style="font-size: 28px; color: white;">
                          {{ singer }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light orange--text mb-1">{{item.musicname}}</div>
                <v-icon color="red">thumb_up</v-icon>{{item.commentsnum}}
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
    </v-layout>-->
    <!-- </v-container> -->

    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in items" :key="item.id">
          <v-hover>
            <v-card
              @click.native="getPlaylist(item.id, item.coverImgUrl)"
              class="mx-auto"
              color="grey lighten-4"
              min-width="300"
              max-width="380"
              slot-scope="{ hover }"
              hover
            >
              <v-img :aspect-ratio="15/14" :src="item.coverImgUrl">
                <v-expand-transition>
                  <div
                    class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                    v-if="hover"
                  >
                    <ul>
                      <!-- <li v-for="singer in item.singers" :key="singer"> -->
                      <div style="font-size: 18px; color: white; overflow: hidden;">
                        <!-- {{ singer }} -->
                        {{item.description}}
                      </div>
                      <!-- </li> -->
                    </ul>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{item.name}}</div>
                <v-icon color="blue darken-2">message</v-icon>
                <b style="font-size: 22px;">{{item.playCount}}</b>
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
      BASE: 14,
      pos: 0,
      message: "",
      search: "",
      itemInfo: {
        id: "",
        title: "",
        price: "",
        stock: "",
        description: "",
        sales: "",
        imgUrl: ""
      },
      headers: [
        {
          text: "title",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "price (rmb)", value: "price" },
        { text: "stock", value: "stock" },
        { text: "sales", value: "sales" },
        { text: "description", value: "description" }
      ],
      pagination: {
        rowsPerPage: 25 // -1 for All",
      },
      items: [],
      sites: [
        {
          text: "网易云音乐",
          disabled: false,
          href: ""
        },
        {
          text: "虾米音乐",
          disabled: true,
          href: ""
        },
        {
          text: "QQ音乐",
          disabled: true,
          href: ""
        },
        {
          text: "酷狗音乐",
          disabled: true,
          href: ""
        },
        {
          text: "酷我音乐",
          disabled: true,
          href: ""
        },
        {
          text: "哔哩哔哩",
          disabled: true,
          href: ""
        },
        {
          text: "咪咕音乐",
          disabled: true,
          href: ""
        }
      ],
      commonRules: [v => !!v || "This is required"]
    };
  },
  created: () => {},
  methods: {
    setPos(pos) {
      console.log(pos);
      this.pos = pos;
      this.getPlayList();
    },
    getPlayList() {
      Vue.prototype.$http
        .get("http://127.0.0.1:5000/topplaylists")
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取歌单列表成功";
            this.items = response.data.data;

            this.items = this.items.slice(
              this.pos * this.BASE,
              (this.pos + 1) * this.BASE
            );

            console.log(response);
            console.log(this.items);
            Snackbar.info(this.message);
          } else {
            this.message =
              "获取商品列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getItemList() {
      Vue.prototype.$http
        .get("http://127.0.0.1:5000/dashboard")
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取歌曲列表成功";
            this.items = response.data.data;

            console.log(response);
            console.log(this.items);
            Snackbar.info(this.message);
          } else {
            this.message =
              "获取商品列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getItemDetail(id) {
      this.$router.push({
        path: "detail",
        name: "音乐详情",
        query: { id: id }
      });
      // window.location.href = "detail?id=" + id;
    },
    getPlaylist(id, url) {
      this.$router.push({ name: "musicPlaylist", query: { id: id, url: url } });
      // window.location.href = "detail?id=" + id;
    }
  },
  mounted() {
    this.getPlayList();
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
</style>