<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <!-- 卡片-音乐详情 -->
      <v-flex xs7>
        <v-hover>
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            min-width="300"
            max-width="680"
            slot-scope="{ hover }"
            hover
          >
          <v-hover>
            <v-img :aspect-ratio="16/14" :src="itemInfo.coverurl">
              <v-expand-transition>
                <div
                  class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                  v-if="hover"
                >
                  <ul>
                    <li v-for="singer in itemInfo.singers" :key="singer">
                      <div style="font-size: 50px; color: white;">
                        {{ singer }}
                      </div>
                    </li>
                  </ul>
                </div>
              </v-expand-transition>
            </v-img>
          </v-hover>
            <v-card-text class="pt-4" style="position: relative;">
              <v-layout row justify-center>
                <v-btn
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
                </v-btn>
              </v-layout>
              <h3 class="display-1 font-weight-light orange--text mb-2">{{itemInfo.musicname}}</h3>
              <div class="font-weight-light grey--text title mb-2">
                专辑：<v-flex v-for="album in itemInfo.albums" :key="album">
                  <font style="font-size: 25px; color: black;">
                    {{ album }}
                  </font>
                </v-flex>
              </div>
              <div class="font-weight-light title mb-2">
                评论数：{{itemInfo.commentsnum}}
                <br />
                歌曲时长：{{itemInfo.duration}}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>

        <v-hover>
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            min-width="300"
            max-width="680"
            hover
          >
            <v-card-text class="pt-4" style="position: relative;">
              <div v-html="itemInfo.lrc"></div>
              <!-- {{itemInfo.lrc}} -->
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>

      <v-dialog v-model="dialog" max-width="500">
        <v-card class="elevation-16 mx-auto" width="500">
          <v-card-title class="headline" primary-title>Rate The Music</v-card-title>
          <v-card-text>
            <div class="text-xs-center mt-5">
              <v-rating
                v-model="rate.rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="star_border"
                half-increments
                hover
              ></v-rating>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn flat @click="dialog = false">No Thanks</v-btn>
            <v-btn color="primary" flat @click="rateit">Rate Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 卡片-评论列表 -->
      <v-flex xs5>
        <div id="e3" style="max-width: 600px; margin: auto;" class="grey lighten-3">
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Hot Comments</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <template v-for="item in comments">
            <v-flex xs12 :key="item.id">
              <v-card class="mx-auto" max-width="550" hover>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{item.title}}</h3>
                    <div>{{ item.content }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                      <v-img class="elevation-6" :src="item.user.avatarUrl"></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{item.user.nickname}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-content color="grey darken-3">
                      <v-list-tile-title>{{item.time}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-btn icon @click="todo">
                      <v-icon color="red">favorite</v-icon>
                    </v-btn>
                    {{item.likedCount}} 
                    <v-btn icon @click="todo">
                      <v-icon color="amber accent-2">bookmark</v-icon>
                    </v-btn>
                    <v-btn icon @click="todo">
                      <v-icon color="blue">share</v-icon>
                    </v-btn>
                  </v-list-tile>
                </v-card-actions>
              </v-card>
            </v-flex>
          </template>
        </div>
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
      commonRules: [v => !!v || "This is required"]
    };
  },
  methods: {
    getItemDetail() {
      console.log("musicid = " + getParam("id"))
      var content = {
        musicid: getParam("id")
      };
      Vue.prototype.$http
        .post("http://127.0.0.1:5000/music/get_music", content)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取歌曲详情成功";
            this.itemInfo = response.data.data;
            // console.log("lrc before------->");
            // console.log(this.itemInfo.lrc);
            this.itemInfo.lrc = this.itemInfo.lrc.replace(/\n/gm,"<br/>");
            // console.log("lrc after------->");
            // console.log(this.itemInfo.lrc);
            // console.log(this.items);
            // console.log("itemInfo------>");
            // console.log(this.itemInfo.musicid);
            Snackbar.info(this.message);
          } else {
            this.message =
              "获取歌曲详情失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    getComment() {
      Vue.prototype.$http
        .get(
          "http://127.0.0.1:5000/music/comment?musicid=" + getParam("id")
        )
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取音乐评论成功";
            this.comments = response.data.data;

            for (let i = 0; i < this.comments.length; i ++){
              // let date = new Date(this.comments[i].time);
              // console.log(date);
              // Y = date.getFullYear();
              this.comments[i].time = (new Date(this.comments[i].time)).getFullYear() + '-'
              + ((new Date(this.comments[i].time)).getMonth()+1 < 10 ? '0'+((new Date(this.comments[i].time)).getMonth()+1) : (new Date(this.comments[i].time)).getMonth()+1) + '-'
              + ((new Date(this.comments[i].time)).getDate() < 10 ? '0' + (new Date(this.comments[i].time)).getDate() : (new Date(this.comments[i].time)).getDate()) + ' '
              + ((new Date(this.comments[i].time)).getHours() < 10 ? '0' + (new Date(this.comments[i].time)).getHours() : (new Date(this.comments[i].time)).getHours()) + ':'
              + ((new Date(this.comments[i].time)).getMinutes() < 10 ? '0' + (new Date(this.comments[i].time)).getMinutes() : (new Date(this.comments[i].time)).getMinutes()) + ':'
              + ((new Date(this.comments[i].time)).getSeconds() < 10 ? '0' + (new Date(this.comments[i].time)).getSeconds() : (new Date(this.comments[i].time)).getSeconds());
              console.log("time----------->")
              console.log(this.comments[i].time)
            }
            
            // Snackbar.info(this.message);
          } else {
            this.message =
              "获取音乐评论失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    rateit() {
      this.dialog = false;
      let ddd = {
        userid: JSON.parse(localStorage.getItem("LOGIN_USER"))["userid"],
        musicid: this.itemInfo.musicid,
        rating: this.rate.rating
      };
      Vue.prototype.$http
        .post("http://127.0.0.1:5000/music/rate", ddd)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "评分成功";
            this.items = response.data.data;
            Snackbar.info(this.message);
          } else {
            this.message = "评分失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    formatDate(timestamp) { 
      var date = new Date(timestamp);
      Y = date.getFullYear() + '-';
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      D = date.getDate() + ' ';
      h = date.getHours() + ':';
      m = date.getMinutes() + ':';
      s = date.getSeconds();
      return Y+M+D+h+m+s;
    },
    todo() {
      Snackbar.info("开发中，请等待……");
    }
  },
  mounted() {
    this.getItemDetail();
    this.getComment();
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