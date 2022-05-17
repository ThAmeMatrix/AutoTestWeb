<template>
  <v-app>
    <!-- 搜索框-搜索歌曲 -->
    <v-container align-center fluid>
      <v-layout>
        <v-flex align-center xs6>
          <v-form>
            <v-text-field
              v-model="search.content"
              append-icon="mic"
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
        </v-flex>
      </v-layout>
    </v-container>

    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
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
      commonRules: [v => !!v || "This is required"]
    };
  },
  created: () => {},
  methods: {
    getItemList() {
      Vue.prototype.$http
        .get("http://127.0.0.1:5000/music/list")
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
      this.$router.push({ name: "音乐详情", query: { id: id } });
      // window.location.href = "detail?id=" + id;
    }
  },
  mounted() {
    this.getItemList();
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