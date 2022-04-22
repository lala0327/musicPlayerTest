<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col">
    <audio controls :ontimeupdate="changeTimelinePosition" :oncanplay="canplay">
      <source type="audio/mpeg" />
    </audio>
    {{ play }}
    <div class="w-full h-full relative overflow-hidden">
      <!-- 上方背景圖 -->
      <div
        class="
          w-full
          h-full
          relative
          bg-cover bg-no-repeat bg-center bg-[url('src/assets/img/flower.png')]
        "
      >
        <!-- 白框 -->
        <div v-if="!openModal" class="w-full h-[calc(100%-230px)] absolute p-8">
          <div
            class="w-full h-full border-white border-[10px] drop-shadow-xl"
          />
        </div>
      </div>
      <!-- 音樂列表 -->
      <div
        class="list w-full h-full pt-10 bg-[rgba(255,255,255,0.3)] absolute"
        :class="openModal ? 'top-0' : 'top-full'"
      >
        <div class="w-full h-[calc(100%-40px)]">
          <!-- tour -->
          <div class="h-16 flex justify-around items-center">
            <img
              v-if="!shuffle"
              src="..\..\assets\icons\btn_back.svg"
              class="h-16 cursor-pointer"
              @click="openModal = false"
            />
            <p
              class="
                text-white text-3xl
                font-black
                drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]
              "
            >
              PLAYLIST
            </p>
            <img
              v-if="!shuffle"
              src="src\assets\icons\btn_more.svg"
              class="h-16 border-white cursor-pointer"
            />
          </div>
          <!-- list -->
          <div class="listcss w-full h-[calc(100%-25px)] overflow-auto pt-8">
            <div
              v-for="music in MusicArr"
              :key="music"
              class="flex justify-center items-center flex-col cursor-pointer"
              :class="
                music.player
                  ? 'bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]'
                  : ''
              "
            >
              <div class="w-11/12 h-16 flex justify-between items-center">
                <div>
                  <p
                    class="name text-lg font-bold"
                    :class="
                      music.player ? 'text-black' : 'text-[rgb(140,140,140)]'
                    "
                  >
                    {{ music.name }}
                  </p>
                  <p class="text-sm text-[rgb(140,140,140)]">
                    {{ music.singer }}
                  </p>
                </div>
                <img
                  v-if="!music.player"
                  src="src\assets\icons\btn_small_play.svg"
                  class="h-16 cursor-pointer"
                />
                <img
                  v-else
                  src="src\assets\icons\btn_small_pause.svg"
                  class="h-16 cursor-pointer"
                />
              </div>
              <hr
                v-if="!music.player"
                class="w-11/12 border-1/2 border-[rgba(140,140,140,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!openModal"
        class="
          w-full
          flex
          justify-center
          items-center
          bottom-0
          bg-white
          flex-col
          absolute
          pb-5
        "
      >
        <!-- 音樂播放頁面 -->
        <div
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
            @click="openModal = true"
          >
            {{ MusicArr[index].name }}
          </div>
          <div class="my-1">{{ MusicArr[index].singer }}</div>
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
          <div class="w-10/12 flex justify-evenly items-center">
            <!-- 隨機播放 -->
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
            <!-- 上一首 -->
            <button type="button" @click="ChangeSong(false, index)">
              <img src="src\assets\icons\btn_Rewind.svg" />
            </button>
            <!-- 播放/暫停 -->
            <button type="button" @click="ControlPlayer">
              <img v-if="!play" src="src/assets/icons/btn_Play.svg" />
              <img v-else src="src/assets/icons/btn_pause.svg" />
            </button>
            <!-- 下一首 -->
            <button type="button" @click="ChangeSong(true, index)">
              <img src="src\assets\icons\btn_Fast.svg" />
            </button>
            <!-- 循環播放 -->
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
  {
    name: "One in a Million",
    singer: "GENERATIONS",
    src: "src/assets/mp3/One in a Million.mp3",
    player: false,
  },
  {
    name: "2",
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
      index: 0,
      play: false,
      shuffle: false,
      repeat: 0,
      openModal: false,
    };
  },
  mounted() {
    const audio = document.querySelector("audio");
    audio.src = this.MusicArr[this.index].src;
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
    ControlPlayer() {
      const audio = document.querySelector("audio");
      if (audio.paused) {
        this.play = true;
        audio.play();
        this.MusicArr[this.index].player = true;
      } else {
        this.play = false;
        audio.pause();
      }
    },
    ChangeSong(bool, index) {
      const audio = document.querySelector("audio");
      this.MusicArr[index].player = false;
      if (bool === true) {
        index += 1;
        if (index === this.MusicArr.length) {
          index = 0;
        }
      } else {
        if (index === 0) {
          index = this.MusicArr.length - 1;
        } else {
          index -= 1;
        }
      }
      this.index = index;
      audio.src = this.MusicArr[this.index].src;
      //點
      this.ControlPlayer();
    },
    ControlRepeat() {
      this.repeat += 1;
      if (this.repeat === 3) {
        this.repeat = 0;
      }
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
.listcss {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 15%,
    rgba(255, 255, 255, 0.8) 100%
  );
}
</style>