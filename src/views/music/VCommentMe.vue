<template>
  <v-app>
    <!-- 列表-个人评论 -->
    <v-card>
      <v-card-title>
        My comments
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.itemId }}</td>
          <td class="text-xs-left">{{ props.item.userId }}</td>
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.content }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td>
            <v-avatar size="40" style="margin:5px;">
              <img :src="props.item.avatar">
            </v-avatar>
          </td>
          <td class="justify-center layout">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click.stop="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>

    <!-- 对话框-确认删除 -->
    <v-dialog v-model="dialog" max-width="360">
      <v-card>
        <v-card-title class="headline orange white--text">WARNING</v-card-title>
        <v-card-text class="mb-2 font-weight-light">
          确定删除吗？
          <br>该操作不可恢复
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat="flat" @click="dialog = false">Cancle</v-btn>
          <v-btn color="grey darken-1" flat="flat" @click="confirmDelete()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 对话框-更新评论表单 -->
    <v-dialog v-model="dialog1" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Comment</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="form">
                  <v-text-field
                    :counter="25"
                    :rules="commonRules"
                    label="title"
                    required
                    v-model="itemInfo.title"
                  ></v-text-field>
                  <v-textarea
                    :rules="commonRules"
                    label="content"
                    required
                    v-model="itemInfo.content"
                  ></v-textarea>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog1 = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="confirmEditComment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

 <script>
import Vue from "vue";
import Snackbar from "../../components/snackbar/index";

export default {
  data() {
    return {
      dialog: false,
      dialog1: false,
      message: "",
      search: "",
      itemInfo: {
        id: "",
        itemId: "",
        userId: "",
        title: "",
        content: "",
        name: "",
        avatar: ""
      },
      headers: [
        {
          text: "commentId",
          align: "left",
          value: "id"
        },
        { text: "itemId", value: "itemId" },
        { text: "userId", value: "userId" },
        { text: "title", value: "title" },
        { text: "content", value: "content" },
        { text: "name", value: "name" },
        { text: "avatar", value: "avatar" }
      ],
      pagination: {
        rowsPerPage: 25 // -1 for All",
      },
      orders: [],
      commonRules: [v => !!v || "This is required"]
    };
  },
  created: () => {},
  methods: {
    getOrderList() {
      Vue.prototype.$http
        .get("http://localhost:8088/comment/listbyuser")
        .then(response => {
          if (response.data.status == "success") {
            this.message = "获取订单列表成功";
            this.orders = response.data.data;
            // Snackbar.info(this.message);
          } else {
            this.message =
              "获取订单列表失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    deleteItem(item) {
      this.dialog = true;
      this.itemInfo = item;
    },
    confirmDelete() {
      this.dialog = false;
      // 提交，确认删除
      Vue.prototype.$http
        .get("http://localhost:8088/comment/delete?id=" + this.itemInfo.id)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "删除成功, id = " + this.itemInfo.id;
            this.orders.splice(this.orders.indexOf(this.itemInfo), 1); //删除前端数据对应项
            Snackbar.warning(this.message);
          } else {
            this.message = "删除失败，原因为" + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          Snackbar.error(error);
        });
    },
    editItem(item) {
      this.dialog1 = true;
      this.itemInfo = item;
    },
    confirmEditComment() {
      this.dialog1 = false;

      console.log(this.itemInfo);

      Vue.prototype.$http
        .post("http://localhost:8088/comment/update", this.itemInfo)
        .then(response => {
          if (response.data.status == "success") {
            this.message = "更新个人评论成功!";
            Snackbar.success(this.message);
          } else {
            this.message =
              "更新个人评论失败，原因为: " + response.data.data.errMsg;
            Snackbar.error(this.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>