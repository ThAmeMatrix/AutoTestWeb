<template>
  <div>
    <router-view />
    <!-- <aplayer :audio="audio" :lrcType="1" fixed /> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      audio: JSON.parse(localStorage.getItem("NOW_MUSIC"))
      // [
      //   {
      //     name: "keep on",
      //     artist: "前田愛",
      //     url: "http://music.163.com/song/media/outer/url?id=619579.mp3",
      //     cover:
      //       "http://p3.music.126.net/pU2Y4NTbyPj2jWvLHW4qhQ==/109951163626599907.jpg",
      //     lrc:
      //       "[by:大熊猫啊]\n[00:38.00]不往後看地继续跑　Sunshine day\n[00:44.00]不屈服於膝盖擦伤的痛楚　Adventure\n[00:51.00]面对著　没有东西可害怕的　My future\n[00:57.00]那干渴的喉咙　给润湿了 因为有　Your smile\n[01:03.00]弱虫な自分に / 向那住在内心深处的　儒弱的自己\n[01:10.00]告别　说再见　令自己一点点地便得坚强\n[01:20.00]就是现在　持著勇气高飞\n[01:26.00]展开那心的翅膀　飞向未知的未来\n[01:32.00]从现在起　被带往那没尽头的宇宙\n[01:39.00]只是刚刚开始　奔向梦的冒险\n[01:46.00]la la la   la la la\n[01:52.00]la la la   la la la\n[02:00.00]抓著你的手　与你一起高飞　Blue sky height\n[02:07.00]你那明亮的声音和微笑是耀眼的　Paradise\n[02:14.00]在黑暗中　即使迷失　也不会放弃不会输\n[02:29.00]我知道我将会看到一线的光 我没有时间去挥洒我的眼泪！\n[02:33.00]即使是现在　我不会再挥洒我的眼泪\n[02:42.00]打开心的眼睛　向未知的未来进发\n[02:46.00]从现在起　我相信　我有力量\n[02:55.00]能再次站起来　就要持有勇气\n[02:59.00]la la la   la la la\n[03:05.00]la la la   la la la\n[03:26.00]如果低著头　垂下肩膀　是永远不会到达\n[03:33.00]那充满希望的　绝妙的终点\n[03:42.00]要继续跑　要继续挑战　就能变得更强！\n[03:53.00]就是现在　持著勇气高飞\n[03:59.00]展开心的翅膀　飞向未知的未来\n[04:05.00]从现在起　被带往那没尽头的宇宙\n[04:11.00]那只是刚刚开始　奔向梦的冒险\n[04:18.00]la la la   la la la\n[04:22.00]la la la   la la la\n[04:31.00]la la la   la la la\n[04:38.00]la la la   la la la\n"
      //   },
      //   {
      //     name: "The Party We Have Never Seen",
      //     artist: "Nana Takahashi",
      //     url: "https://cdn.moefe.org/music/mp3/thepartywehaveneverseen.mp3",
      //     cover: 'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300', // prettier-ignore
      //     lrc: "https://cdn.moefe.org/music/lrc/thepartywehaveneverseen.lrc"
      //   },
      //   {
      //     name: "白金ディスコ",
      //     artist: "井口裕香",
      //     url: "https://cdn.moefe.org/music/mp3/thepartywehaveneverseen.mp3",
      //     cover: 'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300', // prettier-ignore
      //     lrc: "https://cdn.moefe.org/music/lrc/thepartywehaveneverseen.lrc"
      //   }
      // ]
    };
  }
};
</script>
