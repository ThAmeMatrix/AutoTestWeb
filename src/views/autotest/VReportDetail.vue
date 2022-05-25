<template>
  <v-app>
    <div>
      <v-btn class="blue font-weight-black" @click.native="back()">
        返回
      </v-btn>
    </div>
    <div class="iframediv">
      <iframe :src="src" ref="iframe"></iframe>
    </div>
  </v-app>

</template>
 
<script>
import Vue from 'vue'
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
      src: "http://192.168.50.78:8000/" + getParam("serialno") + "/" + getParam("report_name") + "/log.html",
      iframeWin: {}
    }
  },
  mounted() {
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
    getReportDetail() {
      console.log("serialno = " + getParam("serialno"));
      console.log("report_name = " + getParam("report_name"));
    },
    sendMessage() {
      // 外部vue向iframe内部传数据
      this.iframeWin.postMessage({
        cmd: 'doSomething',
        params: {}
      }, '*')
    },
    handleMessage(event) {
      // 根据上面制定的结构来解析 iframe 内部发回来的数据
      const data = event.data
      switch (data.cmd) {
        case 'ready-for-receiving':
          // 业务逻辑
          break
      }
    },
    back() {
      this.$router.push({ name: "facilityDetail", query: { serialno: getParam("serialno") } });
    }
  },
  mounted() {
    // this.getReportDetail();
  }
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
  width: 1632px;
  height: 940px;
  margin: 0px auto;
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