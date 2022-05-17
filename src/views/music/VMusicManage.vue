<template>
  <v-app>
    <!-- <v-breadcrumbs :items="sites" divider="|"></v-breadcrumbs> -->
    <v-flex>
      <v-btn color="primary" @click="setPos(-1)">聚合搜索</v-btn>
      <v-btn color="primary" @click="setPos(0)">网易云音乐</v-btn>
      <v-btn color="primary" @click="setPos(1)">虾米音乐</v-btn>
      <v-btn color="primary" @click="setPos(2)">QQ音乐</v-btn>
      <v-btn color="primary" @click="setPos(3)">酷狗音乐</v-btn>
      <v-btn color="primary" @click="setPos(4)">酷我音乐</v-btn>
      <v-btn color="primary" @click="setPos(5)">哔哩哔哩</v-btn>
      <v-btn color="primary" @click="setPos(6)">咪咕音乐</v-btn>
    </v-flex>
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
          <v-btn color="primary" icon @click="searchMusic">
            <v-icon>add</v-icon>
          </v-btn>
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
            <a title="歌曲id" @click="getItemDetail(props.item.musicid)">{{ props.item.musicid }}</a>
          </td>
          <td>
            <a title="歌曲名称" @click="getItemDetail(props.item.musicid)">{{ props.item.musicname }}</a>
          </td>
          <td>
            <a title="歌曲封面" @click="getItemDetail(props.item.musicid)">
              <v-avatar size="50" tile style="margin:5px">
                <img :src="props.item.coverurl" />
              </v-avatar>
            </a>
          </td>
          <td title="歌曲时长" class="text-xs-left">{{ props.item.duration }}</td>
          <td title="歌曲总评论数" class="text-xs-left">{{ props.item.commentsnum }}</td>
          <td title="歌手" class="text-xs-left">
            <v-flex v-for="singer in props.item.singers" :key="singer">{{ singer }}</v-flex>
            <!-- {{ props.item.singers }} -->
          </td>
          <td title="专辑" class="text-xs-left">
            <v-flex v-for="album in props.item.albums" :key="album">{{ album }}</v-flex>
            <!-- {{ props.item.albums }} -->
          </td>
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
      BASE: 14,
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
        { text: "albums", value: "albums" },
        // { text: "operations", value: "operations" }
      ],
      pagination: {
        rowsPerPage: 25 // -1 for All",
      },
      items: [],
      sites: [
        {
          text: "综合搜索",
          disabled: false,
          href: ""
        },
        {
          text: "网易云音乐",
          disabled: true,
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
      ]
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
              "获取歌曲列表失败，原因为" + response.data.data.errMsg;
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
    this.getItemList();
  }
};
</script>
