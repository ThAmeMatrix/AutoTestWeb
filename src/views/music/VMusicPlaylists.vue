<template>
  <v-app>
    <!-- 搜索框-搜索歌曲 -->
    <v-container align-center fluid>
      <v-layout>
        <v-flex align-center xs6>
          <v-form>
            <!-- append-icon="mic" -->
            <v-text-field
              v-model="search.content"
              class="mx-3"
              flat
              label="Type here..."
              prepend-inner-icon="search"
              name="search"
              type="text"
              solo-inverted
            ></v-text-field>
          </v-form>
        </v-flex>
        <v-flex align-center xs6>
          <v-btn color="primary" icon @click="searchMusic">
            <v-icon>search</v-icon>
          </v-btn>
          <!-- <v-btn color="primary" icon @click="searchMusic">
            <v-icon>add</v-icon>
          </v-btn> -->
        </v-flex>
      </v-layout>
    </v-container>

    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in playlists" :key="item.musicid">
          <v-hover>
            <v-card
              @click.native="getPlaylist(item.id)"
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
                        <div style="font-size: 18px; color: white;">
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
                <v-icon color="blue darken-2">message</v-icon><b style="font-size: 22px;">{{item.playCount}}</b>
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
      search: {
        content: ""
      },
      message: "",
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
          text: "musicid",
          align: "left",
          sortable:false,
          value: "musicid"
        },
        { text: "musicname", sortable: false, value: "musicname" },
        { text: "image", value: "image" },
        { text: "duration", value: "duration" },
        { text: "commentsnum", value: "commentsnum" },
        { text: "singers", value: "singers" },
        { text: "albums", value: "albums" }
      ],
      pagination: {
        rowsPerPage: 25 // -1 for All",
      },
      items: [],
      playlists: [
        {
          id: 2910836399,
          name: 'RAP',
          coverImgUrl: 'http://p3.music.126.net/BxbD0eLlbwChn-HJmCwIIA==/820235674321031.jpg',
          commentNum: 0,
          description: '',
          playCount: 1,
        },
        {
          id: 2999458603,
          name: 'moemoe',
          coverImgUrl: 'http://p4.music.126.net/B-8NqlIDSZZ6kAqSlk5rKg==/109951163731824547.jpg',
          commentNum: 0,
          description: '',
          playCount: 4,
        },
        {
          id: 2979961684,
          name: '情到深处',
          coverImgUrl: 'http://p3.music.126.net/a2wI-qG-PMP6fYFcV0cf6A==/43980465123911.jpg',
          commentNum: 0,
          description: '',
          playCount: 24,
        },
        {
          id: 2767452972,
          name: 'key',
          coverImgUrl: 'http://p4.music.126.net/goFb8Sm6cDGy1k0y0LR4lQ==/702587930160733.jpg',
          commentNum: 1,
          description: '',
          playCount: 0,
        },
        {
          id: 2639770780,
          name: '逗比歌单',
          coverImgUrl: 'http://p3.music.126.net/PeNkk0KyknsU9G_vUwMA2A==/848822976643265.jpg',
          commentNum: 1,
          description: '',
          playCount: 4,
        },
        {
          id: 2575544980,
          name: '狐妖小红娘',
          coverImgUrl: 'http://p3.music.126.net/1QSIjG47zPCZf2pwI2J2YQ==/19025949207041612.jpg',
          commentNum: 1,
          description: '',
          playCount: 24,
        },
        {
          id: 2560235782,
          name: '重启咲良田',
          coverImgUrl: 'http://p4.music.126.net/4goXPyLxGw4jd_jJUTPcVA==/18959978509596507.jpg',
          commentNum: 1,
          description: '「重启」──光是这样一句话，三天的世界就此死了。\n咲良田，一座看似平凡普通、安详宁静的城镇，实际上城中半数居民都是拥有超能力并受到约束的「能力者」。\n就读高中的浅井惠和春埼美空，正是官方严密控管的对象，因为浅井与春埼合作的「重启」指令，能够让世界如同时光倒流般回到三天前，使一切重新来过。\n为了让官方放宽监视而加入服务性社团的浅井和春埼，某天收到了一名少女的委托：「请让我的猫复活！」于是，两人为了救助猫咪，进行了「重启」……',
          playCount: 4,
        },
        {
          id: 2403928248,
          name: '寒蝉',
          coverImgUrl: 'http://p4.music.126.net/aFc3WmQxHKKtlBwKt0cPbw==/367236883683900.jpg',
          commentNum: 1,
          description: '',
          playCount: 2,
        },
        {
          id: 2136841271,
          name: '素晴',
          coverImgUrl: 'http://p4.music.126.net/QU-hCU0Yla8wNBV2m66urg==/18735678139060808.jpg',
          commentNum: 1,
          description: '',
          playCount: 15,
        },
        {
          id: 805528535,
          name: 'everlasting song',
          coverImgUrl: 'http://p4.music.126.net/ivlCltZ5_PHSednttGmLBg==/926888302240122.jpg',
          commentNum: 0,
          description: '',
          playCount: 96,
        },
      ],
      commonRules: [v => !!v || "This is required"]
    };
  },
  created: () => {},
  methods: {
    getItemList() {
      Vue.prototype.$http
        .get("http://127.0.0.1:5000/getmyplaylists")
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取歌曲列表成功";
            this.playlists = response.data.data;

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
    searchMusic() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      };
      Vue.prototype.$http
        .post("http://127.0.0.1:5000/music/search", this.search)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "查询歌曲列表成功";
            this.items = response.data.data;
            Snackbar.info(this.message);
          } else {
            this.message =
              "查询商品列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getItemDetail(id) {
      this.$router.push({ name: "musicDetail", query: { id: id } });
      // window.location.href = "detail?id=" + id;
    },
    getPlaylist(id) {
      this.$router.push({ name: "musicPlaylist", query: { id: id } });
      // window.location.href = "detail?id=" + id;
    },
  },
  mounted() {
    this.getItemList();
  },
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
