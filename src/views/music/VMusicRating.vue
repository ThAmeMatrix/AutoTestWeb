<template>
  <v-app>
    <!-- 搜索框-搜索歌曲 -->
    <v-container align-center fluid>
      <v-layout>
        <v-flex align-center xs6>
          <v-form>
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
          <td><a title="歌曲id" @click="getItemDetail(props.item.musicid)">{{ props.item.musicid }}</a></td>
          <td><a title="歌曲名称" @click="getItemDetail(props.item.musicid)">{{ props.item.musicname }}</a></td>
          <td>
            <a title="歌曲封面" @click="getItemDetail(props.item.musicid)">
            <v-avatar size="50" tile style="margin:5px">
              <img :src="props.item.coverurl">
            </v-avatar>
            </a>
          </td>
          <td title="歌曲时长" class="text-xs-left">{{ props.item.duration }}</td>
          <td title="歌曲总评论数" class="text-xs-left">{{ props.item.commentsnum }}</td>
          <td title="歌手" class="text-xs-left">
            <v-flex v-for="singer in props.item.singers" :key="singer">
              {{ singer }} 
            </v-flex>
            <!-- {{ props.item.singers }} -->
          </td>
          <td title="专辑" class="text-xs-left">
            <v-flex v-for="album in props.item.albums" :key="album">
              {{ album }} 
            </v-flex>
            <!-- {{ props.item.albums }} -->
          </td>
          <td title="评分" class="text-xs-left">{{ props.item.rating }}</td>
          <!-- <td>
            <v-icon @click="editItem(props.item)">add</v-icon>
            <v-icon @click="editItem(props.item)">folder_open</v-icon>
            <v-icon @click="editItem(props.item)">star</v-icon>
            <v-icon @click="editItem(props.item)">link</v-icon>
          </td> -->
        </template>
      </v-data-table>
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
        { text: "albums", value: "albums" },
        { text: "rating", value: "rating" },
        // { text: "operations", value: "operations" }
      ],
      pagination: {
        rowsPerPage: 25 // -1 for All",
      },
      items: [],
    };
  },
  created: () => {},
  methods: {
    getItemList() {
      Vue.prototype.$http
        .post("http://127.0.0.1:5000/music/rating", JSON.parse(localStorage.getItem("LOGIN_USER")))
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取评分列表成功";
            this.items = response.data.data;

            console.log(response);
            console.log(this.items);
            Snackbar.info(this.message);
          } else {
            this.message =
              "获取评分列表失败，原因为" + response.data.data.errMsg;
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
      this.$router.push({ name: "musicDetail", query: { id: id } });
      // window.location.href = "detail?id=" + id;
    }
  },
  mounted() {
    this.getItemList();
  }
};
</script>