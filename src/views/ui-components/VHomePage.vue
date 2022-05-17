<template>
  <v-app>
    <v-card-text>top 100 musics</v-card-text>
    <v-container fluid grid-list-xl>
      <!-- 卡片列表-商品概览 -->
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
      commonRules: [v => !!v || "This is required"]
    };
  },
  created: () => {},
  methods: {
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
      this.$router.push({ path: "detail", name: "音乐详情", query: { id: id } });
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