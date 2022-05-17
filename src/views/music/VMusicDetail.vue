<template>
  <v-container fluid grid-list-xl>
    <aplayer :audio="audio" :lrcType="1" />
    <v-layout>
      <!-- 卡片-音乐详情 -->
      <v-flex xs7>
        <v-hover>
          <v-card class="mx-auto" color="grey lighten-4" min-width="300" max-width="680" hover>
            <v-hover>
              <v-img :aspect-ratio="16/14" :src="itemInfo.coverurl" slot-scope="{ hover }">
                <v-expand-transition>
                  <div
                    class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                    v-if="hover"
                  >
                    <ul>
                      <li v-for="singer in itemInfo.singers" :key="singer">
                        <div style="font-size: 50px; color: white;">{{ singer }}</div>
                      </li>
                    </ul>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
            <v-card-text class="pt-4" style="position: relative;">
              <v-list-tile class="grow">
                <!-- <v-btn
                  @click="dialog2 = true"
                  absolute
                  class="white--text"
                  color="blue"
                  fab
                  large
                  top
                  title="Add to playlist"
                >
                  <v-icon>add</v-icon>
                </v-btn> -->
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
              </v-list-tile>
              <!-- <v-layout row justify-center>
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
              </v-layout>-->
              <h3 class="display-1 font-weight-light black--text mb-2">{{itemInfo.musicname}}</h3>
              <div class="font-weight-light grey--text title mb-2">
                专辑：
                <v-flex v-for="album in itemInfo.albums" :key="album">
                  <font style="font-size: 25px; color: black;">{{ album }}</font>
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
          <v-card class="mx-auto" color="grey lighten-4" min-width="300" max-width="680">
            <v-card-text class="pt-4" style="position: relative;">
              <div v-html="itemInfo.lrc"></div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>

      <v-dialog v-model="dialog" max-width="500">
        <v-card class="elevation-16 mx-auto" width="500">
          <v-card-title class="headline" primary-title>给歌曲评分</v-card-title>
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
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false">关闭</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="rateit">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" max-width="500px">
        <v-card>
          <v-card-title>加入歌单</v-card-title>
          <v-card-text>
            <v-btn color="primary" dark @click="dialog3 = !dialog3">创建新歌单</v-btn>
            <v-select :items="select" label="选择歌单" item-value="text"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog2 = false">关闭</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog2 = false">保存</v-btn>
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
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="输入歌单名字*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-textarea label="输入歌单描述" hint="请输入您对该歌单的描述信息"></v-textarea>
                </v-col>
              </v-row>
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
            <v-toolbar-title>热评</v-toolbar-title>
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
                    <v-spacer></v-spacer>
                    {{item.likedCount & 1 == 1 ? 'QQ音乐' : '网易云音乐'}}
                    <!-- <v-btn icon @click="todo">
                      <v-icon color="amber accent-2">bookmark</v-icon>
                    </v-btn>
                    <v-btn icon @click="todo">
                      <v-icon color="blue">share</v-icon>
                    </v-btn>-->
                  </v-list-tile>
                </v-card-actions>
              </v-card>
            </v-flex>
          </template>
        </div>
      </v-flex>
    </v-layout>

    <!-- <aplayer :audio="audio" :lrcType="1" fixed /> -->
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
      items: [
        {
          title: "Click Me"
        },
        {
          title: "Click Me"
        },
        {
          title: "Click Me"
        },
        {
          title: "Click Me 2"
        }
      ],
      select: [
        { text: "RAP" },
        { text: "moemoe" },
        { text: "情到深处" },
        { text: "key" },
        { text: "逗比歌单" },
        { text: "狐妖小红娘" },
        { text: "重启咲良田" },
        { text: "寒蝉" },
        { text: "素晴" },
        { text: "everlasting song" }
      ],
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
      console.log("musicid = " + getParam("id"));
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

            this.audio = {
              name: this.itemInfo.musicname,
              artist: this.itemInfo.singers,
              url: this.itemInfo.downloadurl,
              cover: this.itemInfo.coverurl,
              lrc: this.itemInfo.lrc
            };
            this.itemInfo.lrc = this.itemInfo.lrc.replace(/\n/gm, "<br/>");

            console.log(this.audio.name);
            console.log(this.audio.artist);
            console.log(this.audio.url);
            console.log(this.audio.cover);
            console.log(this.audio.lrc);

            // localStorage.setItem("NOW_MUSIC", JSON.stringify(this.audio));

            now_music = JSON.parse(localStorage.getItem("NOW_MUSIC"));
            console.log(now_music);

            let flag = 1;
            for (let i = 0; i < now_music.length; i ++){
              if (now_music[i]['name'] == this.audio.name){
                flag = 0;
                break;
              }
            }
            if (flag == 0) {
              this.message =
                "该歌曲已在播放列表";
              Snackbar.error(this.message);
            }
            else{
              now_music.push(this.audio);
            }

            console.log(now_music);
            localStorage.setItem("NOW_MUSIC", JSON.stringify(now_music));

            // localStorage.setItem(
            //   "NOW_MUSIC",
            //   JSON.stringify([
            //     {
            //       name: "keep on",
            //       artist: "前田愛",
            //       url:
            //         "http://music.163.com/song/media/outer/url?id=619579.mp3",
            //       cover:
            //         "http://p3.music.126.net/pU2Y4NTbyPj2jWvLHW4qhQ==/109951163626599907.jpg",
            //       lrc:
            //         "[by:大熊猫啊]\n[00:38.00]不往後看地继续跑　Sunshine day\n[00:44.00]不屈服於膝盖擦伤的痛楚　Adventure\n[00:51.00]面对著　没有东西可害怕的　My future\n[00:57.00]那干渴的喉咙　给润湿了 因为有　Your smile\n[01:03.00]弱虫な自分に / 向那住在内心深处的　儒弱的自己\n[01:10.00]告别　说再见　令自己一点点地便得坚强\n[01:20.00]就是现在　持著勇气高飞\n[01:26.00]展开那心的翅膀　飞向未知的未来\n[01:32.00]从现在起　被带往那没尽头的宇宙\n[01:39.00]只是刚刚开始　奔向梦的冒险\n[01:46.00]la la la   la la la\n[01:52.00]la la la   la la la\n[02:00.00]抓著你的手　与你一起高飞　Blue sky height\n[02:07.00]你那明亮的声音和微笑是耀眼的　Paradise\n[02:14.00]在黑暗中　即使迷失　也不会放弃不会输\n[02:29.00]我知道我将会看到一线的光 我没有时间去挥洒我的眼泪！\n[02:33.00]即使是现在　我不会再挥洒我的眼泪\n[02:42.00]打开心的眼睛　向未知的未来进发\n[02:46.00]从现在起　我相信　我有力量\n[02:55.00]能再次站起来　就要持有勇气\n[02:59.00]la la la   la la la\n[03:05.00]la la la   la la la\n[03:26.00]如果低著头　垂下肩膀　是永远不会到达\n[03:33.00]那充满希望的　绝妙的终点\n[03:42.00]要继续跑　要继续挑战　就能变得更强！\n[03:53.00]就是现在　持著勇气高飞\n[03:59.00]展开心的翅膀　飞向未知的未来\n[04:05.00]从现在起　被带往那没尽头的宇宙\n[04:11.00]那只是刚刚开始　奔向梦的冒险\n[04:18.00]la la la   la la la\n[04:22.00]la la la   la la la\n[04:31.00]la la la   la la la\n[04:38.00]la la la   la la la\n"
            //     },
            //     {
            //       name: "The Party We Have Never Seen",
            //       artist: "Nana Takahashi",
            //       url:
            //         "https://cdn.moefe.org/music/mp3/thepartywehaveneverseen.mp3",
            //       cover: 'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300', // prettier-ignore
            //       lrc:
            //         "https://cdn.moefe.org/music/lrc/thepartywehaveneverseen.lrc"
            //     }
            //   ])
            // );

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
        .get("http://127.0.0.1:5000/music/comment?musicid=" + getParam("id"))
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取音乐评论成功";
            this.comments = response.data.data;

            for (let i = 0; i < this.comments.length; i++) {
              // let date = new Date(this.comments[i].time);
              // console.log(date);
              // Y = date.getFullYear();
              this.comments[i].time =
                new Date(this.comments[i].time).getFullYear() +
                "-" +
                (new Date(this.comments[i].time).getMonth() + 1 < 10
                  ? "0" + (new Date(this.comments[i].time).getMonth() + 1)
                  : new Date(this.comments[i].time).getMonth() + 1) +
                "-" +
                (new Date(this.comments[i].time).getDate() < 10
                  ? "0" + new Date(this.comments[i].time).getDate()
                  : new Date(this.comments[i].time).getDate()) +
                " " +
                (new Date(this.comments[i].time).getHours() < 10
                  ? "0" + new Date(this.comments[i].time).getHours()
                  : new Date(this.comments[i].time).getHours()) +
                ":" +
                (new Date(this.comments[i].time).getMinutes() < 10
                  ? "0" + new Date(this.comments[i].time).getMinutes()
                  : new Date(this.comments[i].time).getMinutes()) +
                ":" +
                (new Date(this.comments[i].time).getSeconds() < 10
                  ? "0" + new Date(this.comments[i].time).getSeconds()
                  : new Date(this.comments[i].time).getSeconds());
              // console.log("time----------->");
              // console.log(this.comments[i].time);
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