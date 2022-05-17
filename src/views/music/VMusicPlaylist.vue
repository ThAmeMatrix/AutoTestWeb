<template>
  <v-app>
    <v-container fluid grid-list-xl>
      <v-layout xs1>
        <v-flex>
          <v-hover>
            <v-card color="grey lighten-4" min-width="200" max-width="600" hover>
              <v-hover>
                <v-img :aspect-ratio="16/14" :src="info.coverurl" />
              </v-hover>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs9>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="name"
                    :readonly="readonly"
                    :clearable="clearable"
                    :placeholder="info.name"
                    label="歌单名字"
                    hint="请输入歌单名字"
                    required
                    append-icon="edit"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4"> -->
                <v-textarea
                  v-model="info.description"
                  auto-grow
                  :clearable="clearable"
                  :filled="filled"
                  label="歌单描述"
                  hint="请输入您对该歌单的描述信息"
                  append-icon="edit"
                ></v-textarea>
                <!-- </v-col> -->
              </v-row>
            </v-container>
          </v-card-text>
        </v-flex>
      </v-layout>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog3 = false">保存</v-btn>
        <v-btn icon>
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>folder_open</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>link</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>share</v-icon>
        </v-btn>
      </v-card-actions> -->
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
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>
            <a title="歌曲id" @click="getItemDetail(props.item.id)">{{ props.item.id }}</a>
          </td>
          <td>
            <a title="歌曲名称" @click="getItemDetail(props.item.id)">{{ props.item.name }}</a>
          </td>
          <td>
            <a title="歌曲封面" @click="getItemDetail(props.item.id)">
              <v-avatar size="50" tile style="margin:5px">
                <img :src="props.item.al.picUrl" />
              </v-avatar>
            </a>
          </td>
          <td
            title="歌曲时长"
            class="text-xs-left"
          >{{ parseInt(props.item.dt / 60000) >= 10 ? parseInt(props.item.dt / 60000) : '0' + parseInt(props.item.dt / 60000) }}:{{ parseInt(props.item.dt / 1000 % 60) >= 10 ? parseInt(props.item.dt / 1000 % 60) : '0' + parseInt(props.item.dt / 1000 % 60) }}</td>
          <td title="歌曲总评论数" class="text-xs-left">{{ props.item.v }}</td>
          <td title="歌手" class="text-xs-left">
            <v-flex v-for="singer in props.item.ar" :key="singer">{{ singer.name }}</v-flex>
            <!-- {{ props.item.singers }} -->
          </td>
          <td title="专辑" class="text-xs-left">
            <!-- <v-flex v-for="album in props.item.al" :key="album">{{ album.name }}</v-flex> -->
            {{ props.item.al.name }}
          </td>
          <!-- <td>
            <v-icon class="mr-2" @click="editItem(props.item)">add</v-icon>
            <v-icon class="mr-2" @click="editItem(props.item)">folder_open</v-icon>
            <v-icon class="mr-2" @click="editItem(props.item)">link</v-icon>
            <v-icon class="mr-2" @click="editItem(props.item)">delete</v-icon>
          </td> -->
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>
    
 <script>
import Vue from "vue";
import Snackbar from "../../components/snackbar/index";

function getTime(duration) {
  let minite = duration / 60;
  let second = duration % 60;
  let st = minite >= 10 ? "" : "0";
  st += minite;
  st += ":";
  st += second >= 10 ? "" : "0";
  st += second;
  return st;
}

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
      BASE: 14,
      readonly: true,
      clearable: true,
      filled: true,
      search: {
        pos: -1,
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
          sortable: false,
          value: "musicid"
        },
        { text: "musicname", sortable: false, value: "musicname" },
        { text: "image", value: "image" },
        { text: "duration", value: "duration" },
        { text: "commentsnum", value: "commentsnum" },
        { text: "singers", value: "singers" },
        { text: "album", value: "album" },
        // { text: "operations", value: "operations" }
      ],
      pagination: {
        rowsPerPage: 25 // -1 for All",
      },
      items: [],
      info: {
        // name: "孤独星球｜一个人的无尽狂欢",
        // coverurl:
        //   "http://p1.music.126.net/snI4d0wli_KfC1ey04ykRQ==/109951164722137920.jpg",
        // description:
        //   "旋转，一个人的舞律\n\n徘徊，在思想的深渊\n\n沉沦，吞没黑暗的夜\n\n独行，月球表面\n\n微烁，暗宇星辰\n\n狂欢，在尽头"
      },
    };
  },
  created: () => {},
  methods: {
    setPos(pos) {
      // console.log(pos);
      this.search.pos = pos;
      console.log(this.search.pos);
      this.searchMusic()
      // this.getPlayList();
    },
    getPlaylist() {
      console.log("playlistid = " + getParam("id"));
      var content = {
        id: getParam("id"),
        coverurl: getParam("url")
      };
      Vue.prototype.$http
        .post("http://127.0.0.1:5000/music/get_playlist", content)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取歌单详情成功";

            this.info = response.data.data.info;
            
            this.items = response.data.data.playlist;

            console.log(this.items);

            Snackbar.info(this.message);
          } else {
            this.message =
              "获取歌单详情失败，原因为" + response.data.data.errMsg;
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
        }
      };
      Vue.prototype.$http
        .post("http://127.0.0.1:5000/music/search", this.search)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "查询歌曲列表成功";
            this.items = response.data.data;

            console.log(this.search.pos)
            if (this.search.pos != -1) {
              this.items = this.items.slice(
                this.search.pos * 5 ,
                this.search.pos * 5 + this.BASE
              );
            }

            Snackbar.info(this.message);
            console.log("search");
            console.log(response);
            console.log(this.items);
          } else {
            this.message =
              "查询商品列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          // Snackbar.error(error);
        });
    },
    getItemDetail(id) {
      this.$router.push({ name: "musicDetail", query: { id: id } });
      // window.location.href = "detail?id=" + id;
    }
  },
  mounted() {
    this.getPlaylist();
  }
};
</script>
