<template>

  <div class="goback">
    <h5>
      <RouterLink :to="{name: 'surah', params: {no}}"><IconClose/> Go back to surah</RouterLink>
    </h5>
  </div>

  <div v-if="tafsirs">
    <h1 style="color: white" align="center">Tafsir Ibn Kathir</h1>
    <div v-html="tafsirs" style="color: white" class="isi-tafsir"></div>
  </div>
</template>

<script>
import IconArrow from "./icons/IconArrow.vue";
import IconClose from "./icons/IconClose.vue";
export default {
  name: "Tafsir",
  components: { IconClose, IconArrow },
  data() {
    return{
      tafsirs: [],
      verseKey : this.$route.params.key,
      no: this.$route.params.no,
    }
  },
  methods: {
    async getTafsir() {
      fetch(`https://api.quran.com/api/v4/quran/tafsirs/92?chapter_number=${this.no}&verse_key=${this.verseKey}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          /*this.tafsirs = json.tafsirs[3];*/

          this.tafsirs = json.tafsirs;
          for (let i = 0; i < this.tafsirs.length; i++) {
            /*this.tafsirs[i] = json.tafsirs[i].resource_id*/
            if (this.tafsirs[i].resource_id == 169) {
              console.log('ok')
              console.log(i)
              this.tafsirs = json.tafsirs[i].text
              console.log(this.tafsirs);
            }
          }

        })
    },
  },
  mounted() {
    this.getTafsir();
  }
};
</script>

<style scoped>
.isi-tafsir{
  padding-top: 30px;
}
.goback{
  padding-bottom: 20px;
}
</style>
