<template>
  <audio
    controls
    :oncanplay="canplay"
    :ontimeupdate="changeTimelinePosition"
    :onended="end"
    class="hidden"
  />
  <!-- 音樂播放頁面(主) -->
  <div
    class="
      w-full
      justify-center
      items-center
      bottom-0
      bg-white
      flex-col
      absolute
      pb-5
    "
  >
    <div
      v-if="musicArr[index]"
      class="
        w-full
        text-center
        flex
        justify-center
        items-center
        flex-col
        relative
      "
    >
      <!-- 漸層 -->
      <div
        class="
          w-full
          h-10
          bg-gradient-to-t
          from-[rgba(255,255,255,1)]
          to-[rgba(255,255,255,0)]
          absolute
          -top-10
        "
      />
      <div
        class="text-2xl font-bold cursor-pointer absolute -top-8"
        @click="openlist"
      >
        {{ musicArr[index].name }}
      </div>
      <div class="my-1">{{ musicArr[index].singer }}</div>
      <input
        type="range"
        id="volume"
        class="timeline w-10/12 my-3 cursor-pointer"
        min="0"
        max="100"
        value="0"
        @change="changeTrack"
      />
      <div class="w-10/12 flex justify-between items-center">
        <div id="start">00:00</div>
        <div id="end">00:00</div>
      </div>
      <!-- 播放控制 -->
      <div class="control w-10/12 flex justify-evenly items-center">
        <!-- 隨機播放 -->
        <button class="btn" type="button" @click="ChangeShuffle">
          <img v-if="!shuffle" src="/playerIcons/btn_ShufflePlayback.svg" />
          <img v-else src="/playerIcons/btn_ShufflePlayback-black.svg" />
        </button>
        <!-- 上一首 -->
        <button class="btn" type="button" @click="ChangeSong('-1', index)">
          <img src="/playerIcons/btn_Rewind.svg" />
        </button>
        <!-- 播放/暫停 -->
        <button class="play" type="button" @click="ChangePlay">
          <img v-if="!play" src="/playerIcons/btn_Play.svg" />
          <img v-else src="/playerIcons/btn_pause.svg" />
        </button>
        <!-- 下一首 -->
        <button class="btn" type="button" @click="ChangeSong('+1', index)">
          <img src="/playerIcons/btn_Fast.svg" />
        </button>
        <!-- 循環播放 -->
        <button class="btn" type="button" @click="ChangeRepeat">
          <img v-if="repeat === 0" src="/playerIcons/btn_RepeatAll.svg" />
          <img v-if="repeat === 1" src="/playerIcons/btn_RepeatOne-black.svg" />
          <img v-if="repeat === 2" src="/playerIcons/btn_RepeatAll-black.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Control",
  data() {
    return {};
  },
  inheritAttrs: false,
  props: {
    musicArr: Array,
    index: Number,
    play: Boolean,
    shuffle: Boolean,
    repeat: Number,
    openlist: Function,
    ChangePlay: Function,
    ChangeShuffle: Function,
    ChangeRepeat: Function,
    ChangeSong: Function,
    end: Function,
  },
  methods: {
    canplay() {
      //預設音樂時長
      const audio = document.querySelector("audio");
      const start = document.getElementById("start");
      const end = document.getElementById("end");
      start.innerHTML = this.timeToMinute(audio.currentTime);
      end.innerHTML = this.timeToMinute(audio.duration);
    },
    changeTimelinePosition() {
      const audio = document.querySelector("audio");
      const timeline = document.querySelector(".timeline");
      // 百分比計算音樂的進度
      const percentagePosition = (100 * audio.currentTime) / audio.duration;
      timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.value = percentagePosition;
      //變動歌曲時間文字
      const start = document.getElementById("start");
      start.innerHTML = this.timeToMinute(audio.currentTime);
    },
    timeToMinute(times) {
      var s = parseInt(parseInt(times) / 60);
      var m = parseInt(parseInt(times) % 60);
      if (m < 10) {
        m = "0" + m;
      }
      var length = "0" + s + ":" + m;
      return length;
    },
    //更改事件
    changeTrack() {
      const audio = document.querySelector("audio");
      const timeline = document.querySelector(".timeline");
      const time = (timeline.value * audio.duration) / 100;
      audio.currentTime = time;
    },
  },
};
</script>
<style scoped>
.control .btn {
  width: 50px;
  height: 50px;
}
.play {
  width: 70px;
  height: 70px;
}

/* 音軌css */
[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  outline: 0;
  background-color: transparent;
}
[type="range"]::-webkit-slider-runnable-track {
  /*可以修改軌道的樣式*/
  height: 4px;
  background: #eee;
}
[type="range"]::-webkit-slider-container {
  /*可以修改容器的樣式*/
  height: 20px;
  overflow: hidden;
}
[type="range"]::-webkit-slider-thumb {
  /*可以修改滾軸的樣式*/
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  border: 1px solid transparent;
  margin-top: -8px;
  border-image: linear-gradient(black, black) 0 fill / 8 20 8 0 / 0px 0px 0
    2000px;
}
</style>
