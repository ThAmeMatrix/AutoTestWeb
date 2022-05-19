<template>
  <div class="iframediv">
    <iframe :src="src" ref="iframe"></iframe>
  </div>
</template>
 
<script>
import Vue from 'vue'
import Snackbar from "../../components/snackbar/index";

export default {
  data() {
    return {
      src: '../html/2022_05_11_17_46_50/log.html',
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