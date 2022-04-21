<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col">
    <div class="w-full h-full">
      <!-- 上方背景圖 -->
      <div class="w-full h-2/3">
        <div
          class="
            w-full
            h-full
            relative
            bg-cover
            bg-no-repeat
            bg-center
            bg-[url('src/assets/img/flower.png')]
          "
        >
          <div
            class="
              absolute
              w-4/5
              h-3/4
              border-white border-[10px]
              drop-shadow-xl
              left-1/2
              top-1/2
              -translate-x-1/2 -translate-y-1/2
            "
          />
          <div
            class="
              w-full
              h-10
              bg-gradient-to-t
              from-[rgba(255,255,255,1)]
              to-[rgba(255,255,255,0)]
              absolute
              bottom-0
            "
          />
        </div>
      </div>
      <!-- 下方音樂資訊 -->
      <div class="w-full flex justify-center items-center flex-col relative">
        <div
          class="
            w-full
            absolute
            -top-5
            text-center
            flex
            justify-center
            items-center
            flex-col
          "
        >
          <div class="text-2xl font-bold cursor-pointer" @click="openModal">
            {{ MusicArr[0].name }}
          </div>
          <div class="my-1">{{ MusicArr[0].singer }}</div>
          <input
            type="range"
            id="volume"
            class="timeline w-10/12 my-3"
            min="0"
            value="0"
            @change="changeTrack"
          />
          <div class="w-10/12 flex justify-between items-center">
            <div id="start">00:00</div>
            <div id="end">00:00</div>
          </div>

          <!-- 播放控制 -->
          <div class="w-10/12 flex justify-between items-center">
            <button type="button" @click="shuffle = !shuffle">
              <img
                v-if="!shuffle"
                src="src\assets\icons\btn_ShufflePlayback.svg"
              />
              <img
                v-else
                src="src\assets\icons\btn_ShufflePlayback-black.svg"
              />
            </button>
            <button type="button" class="">
              <img src="src\assets\icons\btn_Rewind.svg" />
            </button>
            <button type="button" @click="ControlPlayer">
              <img v-if="!play" src="src/assets/icons/btn_Play.svg" />
              <img v-else src="src/assets/icons/btn_pause.svg" />
            </button>
            <button type="button" class="">
              <img src="src\assets\icons\btn_Fast.svg" />
            </button>
            <button type="button" @click="ControlRepeat">
              <img
                v-if="repeat === 0"
                src="src\assets\icons\btn_RepeatAll.svg"
              />
              <img
                v-if="repeat === 1"
                src="src\assets\icons\btn_RepeatOne-black.svg"
              />
              <img
                v-if="repeat === 2"
                src="src\assets\icons\btn_RepeatAll-black.svg"
              />
            </button>
          </div>
        </div>
      </div>

      <audio controls class="hidden" :ontimeupdate="changeTimelinePosition">
        <source src="src/assets/mp3/Knocking Knocking.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>
<script setup>
const MusicArr = [
  {
    name: "Knocking Knocking",
    singer: "The Rampage",
    src: "src/assets/mp3/Knocking Knocking.mp3",
    player: false,
  },
];
</script>

<script>
export default {
  name: "MusicPlayer",
  components: {},
  data() {
    return {
      play: false,
      shuffle: false,
      repeat: 0,
    };
  },
  mounted() {},
  methods: {
    ControlPlayer() {
      const audio = document.querySelector("audio");
      if (audio.paused) {
        this.play = true;
        audio.play();
      } else {
        this.play = false;
        audio.pause();
      }
    },
    ControlRepeat() {
      this.repeat += 1;
      if (this.repeat === 3) {
        this.repeat = 0;
      }
    },
    changeTimelinePosition() {
      const timeToMinute = function (times) {
        const time = parseInt(times);
        var a = parseInt(time / 60);
        var b = parseInt(time % 60);
        if (b < 10) {
          b = "0" + b;
        }
        var c = "0" + a + ":" + b;
        return c;
      };
      const audio = document.querySelector("audio");
      const timeline = document.querySelector(".timeline");
      // 百分比計算音樂的進度
      const percentagePosition = (100 * audio.currentTime) / audio.duration;
      timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.value = percentagePosition;
      //變動歌曲時間文字
      const start = document.getElementById("start");
      const end = document.getElementById("end");
      start.innerHTML = timeToMinute(audio.currentTime);
      end.innerHTML = timeToMinute(audio.duration);
    },
    //更改事件
    changeTrack() {
      const audio = document.querySelector("audio");
      const timeline = document.querySelector(".timeline");
      const time = (timeline.value * audio.duration) / 100;
      audio.currentTime = time;
    },
    openModal() {},
  },
};
</script>
<style scoped>
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