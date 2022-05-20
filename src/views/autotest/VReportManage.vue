<template>
  <v-app>
    <!-- <div class="iframediv">
      <iframe :src="src" ref="iframe"></iframe>
    </div> -->
    <!-- 卡片列表-商品概览 -->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="item in list" :key="item.serialno">
          <v-hover>
            <v-card @click.native="getReportDetail(item)" class="mx-auto" color="grey lighten-4" min-width="100" max-width="250" slot-scope="{ hover }" hover>
              <v-img :aspect-ratio="12 / 14" :src="coverImgUrl">
              </v-img>
              <v-card-text style="position: relative;">
                <div class="title font-weight-light black--text mb-1">{{ item.serialno }}</div>
                <div class="title font-weight-light black--text mb-1">{{ item.report_name }}</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
 
<script>
import Vue from 'vue'
import Snackbar from "../../components/snackbar/index";

export default {
  data() {
    return {
      coverImgUrl: '../phone/1b86fce3_E377873_a1aed127.png',
      list: [
        {
          serialno: "8py5obyteanrug9t",
          report_name: "2022_05_16_15_26_28",
        }
      ],
      src: 'http://localhost:8000/',
      iframeWin: {}
    }
  },
  mounted() {
    console.log("files")
    const files = require.context('D:\\html\\2022_05_11_17_46_50\\', false).keys();
    console.log(files)

    this.iframeWin = this.$refs.iframe.contentWindow
    this.$nextTick(() => {
      // 在外部 Vue 的 window 上添加 postMessage 的监听，并且绑定处理函数 handleMessage
      window.addEventListener('message', this.handleMessage)
    })
  },
  destroyed() {
    // 注意移除监听！注意移除监听！注意移除监听！
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    getReportDetail(item) {
      this.$router.push({ name: "reportDetail", query: { serialno: item.serialno, report_name: item.report_name } });
      // window.location.href = "detail?id=" + id;
    }
  }
}

function adjustIframe() {
  var ifm = document.getElementById("bi_iframe");
  ifm.height = document.documentElement.clientHeight;
  ifm.width = document.documentElement.clientWidth;
}

// 兼容性代码
function autoHeight(iframe) {
  if (iframe) {
    var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body) {
      iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
      iframe.width = iframeWin.document.documentElement.scrollWidth || iframeWin.document.body.scrollWidth;
    }
  }
}
window.onload = function () {
  autoHeight(document.getElementById('iframe'));
}
</script>
 
<style scoped>
.iframediv {
  width: 100%;
  height: 40%;
  margin: 100px auto;
  border: 10px dashed rgb(58, 58, 58);
  overflow: hidden;
}

.iframediv iframe {
  width: 1920px;
  height: 1080px;
  top: 0;
  left: 0;
  transform-origin: top left;
  transform: scale(0.85)
}
</style>