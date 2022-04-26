<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col">
    <div class="w-full h-full relative overflow-hidden">
      <!-- 上方背景圖 -->
      <div
        v-if="musicArr[index]"
        class="w-full h-full relative bg-cover bg-no-repeat bg-center"
        :style="{
          backgroundImage: 'url(' + musicArr[index].png + ')',
        }"
      >
        <!-- 白框 -->
        <div v-if="!openModal" class="w-full h-[calc(100%-230px)] absolute p-8">
          <div
            class="w-full h-full border-white border-[10px] drop-shadow-xl"
          />
        </div>
      </div>
      <div :class="openModal ? 'hidden' : 'flex'">
        <Control
          :index="index"
          :play="play"
          :shuffle="shuffle"
          :repeat="repeat"
          :musicArr="musicArr"
          :openModal="openModal"
          :ChangePlay="
            () => {
              play = !play;
            }
          "
          :ChangeShuffle="
            () => {
              shuffle = !shuffle;
            }
          "
          :ChangeRepeat="ChangeRepeat"
          :ChangeSong="ChangeSong"
          :openlist="
            () => {
              openModal = true;
            }
          "
          :end="end"
        />
      </div>
      <List
        :index="index"
        :play="play"
        :musicArr="musicArr"
        :ChangeSong="ChangeSong"
        :closelist="
          () => {
            openModal = false;
          }
        "
        :class="openModal ? 'animate-[uplist_0.3s_ease-in_forwards]' : ''"
      />
    </div>
  </div>
</template>
<script>
import Control from "./Control.vue";
import List from "./List.vue";
import musicData from "../../public/data/musicData.json";
export default {
  name: "Home",
  components: { Control, List, musicData },
  data() {
    return {
      index: 0,
      play: false,
      shuffle: false,
      repeat: 0,
      openModal: false,
      musicArr: [],
      ddd: {}
    };
  },
  watch: {
    index: function (newValue, oldValue) {
      const audio = document.querySelector("audio");
      audio.src = this.musicArr[newValue].src;
      this.play = true;
      audio.play();
    },
    play: function () {
      const audio = document.querySelector("audio");
      if (this.play) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    shuffle: function (newValue, oldValue) {
      if (newValue === true) {
        var shuffleArr = [];
        var numArr = [];
        var musicindex = 0;
        const audio = document.querySelector("audio");
        const musicName = audio.src
          .split("/mp3/")[1]
          .split(".mp3")[0]
          .replace(/%20/g, " ");
        for (let i = 0; i <= this.musicArr.length - 1; i++) {
          //創造數字陣列
          numArr.push(i);
          //提出目前撥放的歌曲
          if (this.musicArr[i].name === musicName) {
            musicindex = i;
            numArr.splice(i, 1);
          }
          //打亂數字陣列
          function sort(array) {
            array.sort(() => Math.random() - 0.5);
          }
          sort(numArr);
        }
        //將原本歌曲放置相同index
        numArr.splice(musicindex, 0, musicindex);
        //重整歌曲陣列
        for (let i in numArr) {
          shuffleArr.push(this.musicArr[numArr[i]]);
        }
        this.musicArr = shuffleArr;
      }
      // 若取消隨機播放，則重抓資料
      else {
        this.musicArr = musicData;
      }
      console.log(numArr);
    },
  },
  mounted() {
    this.musicArr = musicData;
    const audio = document.querySelector("audio");
    audio.src = this.musicArr[this.index].src;
  },
  methods: {
    //換歌
    ChangeSong(str, index) {
      const audio = document.querySelector("audio");
      if (str === "+1") {
        index += 1;
        if (index === this.musicArr.length) {
          index = 0;
        }
      } else if (str === "-1") {
        if (index === 0) {
          index = this.musicArr.length - 1;
        } else {
          index -= 1;
        }
      } else {
        const src = audio.src
          .split("/mp3/")[1]
          .split(".mp3")[0]
          .replace(/%20/g, " ");
        const nextsrc = this.musicArr[index].src
          .split("/mp3/")[1]
          .split(".mp3")[0];
        if (this.play && src === nextsrc) {
          this.play = false;
        } else {
          this.play = true;
        }
      }
      this.index = index;
    },
    ChangeRepeat() {
      this.repeat += 1;
      if (this.repeat === 3) {
        this.repeat = 0;
      }
    },
    end() {
      const audio = document.querySelector("audio");
      if (this.repeat === 0) {
        this.play = false;
      } else if (this.repeat === 1) {
        audio.src = this.musicArr[this.index].src;
        this.play = true;
        audio.play();
      } else {
        this.ChangeSong("+1", this.index);
      }
    },
  },
};
</script>
<style>
@keyframes uplist {
  0% {
    top: 100%;
  }
  100% {
    top: 0%;
  }
}
</style>