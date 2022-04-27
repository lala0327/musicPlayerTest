<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col">
    <div class="w-full h-full relative overflow-hidden">
      <!-- 上方背景圖 -->
      <div
        v-if="musicArr[index]"
        class="w-full h-full relative bg-cover bg-no-repeat bg-center blur-sm"
        :style="{
          backgroundImage: 'url(' + musicArr[index].png + ')',
        }"
      />
      <!-- 白框 -->
      <div
        v-if="!openModal"
        class="w-full h-[calc(100%-230px)] absolute p-8 top-0"
      >
        <div
          class="
            w-full
            h-full
            border-white border-[10px]
            drop-shadow-xl
            overflow-hidden
          "
        >
          <div
            v-if="musicArr[index]"
            class="
              w-screen
              h-screen
              bg-cover bg-no-repeat bg-center
              absolute
              -top-11
              -left-11
            "
            :style="{
              backgroundImage: 'url(' + musicArr[index].png + ')',
            }"
          ></div>
        </div>
      </div>
      <div :class="openModal ? 'hidden' : 'flex'">
        <Control
          :index="index"
          :play="play"
          :shuffle="shuffle"
          :musicArr="musicArr"
          :openlist="() => (openModal = true)"
          :ChangePlay="() => (play = !play)"
          :ChangeShuffle="() => (shuffle = !shuffle)"
          :setIndex="(i) => (index = i)"
          :setPlay="(i) => (play = i)"
          :setRepeat="(i) => (controlrepeat = i)"
          :repeatPlay="repeatPlay"
        />
      </div>
      <List
        :index="index"
        :play="play"
        :musicArr="musicArr"
        :setIndex="(i) => (index = i)"
        :setPlay="(i) => (play = i)"
        :closelist="() => (openModal = false)"
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
  components: { Control, List },
  data() {
    return {
      index: 0,
      play: false,
      controlrepeat: 0,
      shuffle: false,
      openModal: false,
      musicArr: [],
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
  },
  mounted() {
    this.musicArr = musicData;
    const audio = document.querySelector("audio");
    audio.src = this.musicArr[this.index].src;
  },
  methods: {
    repeatPlay() {
      const audio = document.querySelector("audio");
      audio.src = this.musicArr[this.index].src;
      audio.play();
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