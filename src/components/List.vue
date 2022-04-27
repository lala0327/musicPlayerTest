<template>
  <!-- 音樂列表(主) -->
  <div class="list w-full h-full pt-10 bg-[rgba(255,255,255,0.3)] absolute">
    <div class="w-full h-[calc(100%-40px)]">
      <!-- tour -->
      <div class="h-16 flex justify-around items-center">
        <img
          src="/playerIcons/btn_back.svg"
          class="h-16 cursor-pointer"
          @click="closelist"
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
          src="/playerIcons/btn_more.svg"
          class="h-16 border-white cursor-pointer"
        />
      </div>
      <!-- list -->
      <div class="listcss w-full h-[calc(100%-25px)] overflow-auto pt-8">
        <div
          v-for="(music, i) in musicArr"
          :key="i"
          class="flex justify-center items-center flex-col cursor-pointer"
          :class="
            index === i && play === true
              ? 'bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]'
              : ''
          "
          @click="ChangeSong(i)"
        >
          <div class="w-11/12 h-16 flex justify-between items-center">
            <div>
              <p
                class="name text-lg font-bold"
                :class="
                  index === i && play === true
                    ? 'text-black'
                    : 'text-[rgb(140,140,140)]'
                "
              >
                {{ music.name }}
              </p>
              <p class="text-sm text-[rgb(140,140,140)]">
                {{ music.singer }}
              </p>
            </div>
            <img
              v-if="!(index === i && play === true)"
              src="/playerIcons/btn_small_play.svg"
              class="h-16 cursor-pointer"
            />
            <img
              v-else
              src="/playerIcons/btn_small_pause.svg"
              class="h-16 cursor-pointer"
            />
          </div>
          <hr
            v-if="!(index === i && play === true)"
            class="w-11/12 border-1/2 border-[rgba(140,140,140,0.5)]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {};
  },
  props: {
    index: Number,
    play: Boolean,
    musicArr: Array,
    closelist: Function,
    setIndex: Function,
    setPlay: Function,
  },
  mounted() {

  },
  watch: {},
  methods: {
    //換歌
    ChangeSong(index) {
      const audio = document.querySelector("audio");
      const src = audio.src
        .split("/mp3/")[1]
        .split(".mp3")[0]
        .replace(/%20/g, " ");
      const nextsrc = this.musicArr[index].src
        .split("/mp3/")[1]
        .split(".mp3")[0];
      if (this.play && src === nextsrc) {
        this.setPlay(false);
      } else {
        this.setPlay(true);
      }
      this.setIndex(index);
    },
  },
};
</script>
<style scoped>
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