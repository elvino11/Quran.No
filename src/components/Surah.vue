<template xmlns="http://www.w3.org/1999/html">

  <div class="navbar">
    <nav class="navbar navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <RouterLink :to="{name: 'home', params: {langCode}}"><a class="navbar-brand" > Quran.No</a></RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Settings</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-title nav-item">
                Language
              </li>
              <li class="nav-item dropdown">
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="this.langCode">
                  <option v-for="language in languages" :value="language.iso_code">
                      {{ language.name }}
                  </option>
                </select>
              </li>
              <li class="nav-title nav-item">
                Audio Recitation
              </li>
              <li class="nav-item dropdown">
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="this.reciId">
                  <option v-for="recitation in recitations" :value="recitation.id">
                    {{ recitation.reciter_name }}
                  </option>
                </select>
              </li>
<!--              <div class="btn-group dropend">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropend
                </button>
              </div>-->
              <!--                <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Menu item</a></li>
                                <li><a class="dropdown-item" href="#">Menu item</a></li>
                                <li><a class="dropdown-item" href="#">Menu item</a></li>
                              </ul>-->
            </ul>
              <button class="btn btn-success" v-on:click="filter">Filter</button>
          </div>
        </div>
      </div>
    </nav>
  </div>


  <div class="list">
    <button v-on:click="prev" class="prev btn btn-danger">Prev</button>
<!--    <input type="number" placeholder="Masukkan no surah" v-model="no">-->
    <select class="form form-select form-select-sm-1" v-model="this.no">
      <option v-for="chapter2 in chapters" :value="chapter2.id">
        {{chapter2.id}}. {{chapter2.name_complex}}
      </option>
    </select>
    <button v-on:click="search" class="search btn btn-success">Search</button>
    <button v-on:click="next" class="next btn btn-info">Next</button>
  </div>

  <div class="image-surah" align="center">
    <img src="/src/assets/bismillah.png" class="bismillah">
  </div>



  <div class="up">
    <a href="#" class="up-icon"><img src="/src/assets/logo.svg" style="width: 50px; height: 30px"></a>
    <!--  <h1>no : {{this.no}}</h1>-->
  </div>
<!--  <section>
    <select class="form-control" v-model="this.no" v-on:select="select">
      <option v-for="chapter2 in chapters" :value="chapter2.id">
        {{chapter2.id}}. {{chapter2.name_complex}}
      </option>
    </select>
    <p>SELECTED : {{ this.no }}</p>
    <p>TEST1 : {{ $route.params.no }}</p>
  </section>-->

  <section class="content">
    <div class="judul" v-if="chapter">
      <h1 style="color: white">{{chapter.name_arabic}}</h1>
      <h4 style="color: white">{{chapter.translated_name.name}}</h4>
    </div>
    <div v-if="audio_file" class="text-start">
      <audio v-bind:src="audio_file.audio_url" controls class="audio-utama"></audio>
      <h5><RouterLink :to="{name: 'info' , params:{no, langCode}}"><IconInfo/> Info Surah</RouterLink></h5>
    </div>
    <hr/>
  </section>

  <section class="isi">
    <div v-for="isi in data">
      <h3 class="text-end" style="color: white; font-weight: bold"> {{isi.textArab}} {{isi.key}}</h3>
      <p v-html="isi.translate" class="text-start" style="color: white; font-size: 16px"></p>
      <audio v-bind:src="`https://verses.quran.com/${isi.audioUrl}`" controls class="audio"></audio>
      <h6 class="toTafsir"><RouterLink :to="{name: 'tafsir', params: {key: isi.key, no}}"><IconBook/> Tafisr</RouterLink></h6>
    </div>
  </section>

  <div class="list-down">
    <button v-on:click="prev" class="prev btn btn-danger">Prev</button>
    <!--    <input type="number" placeholder="Masukkan no surah" v-model="no">-->
    <select class="form form-select form-select-sm-1" v-model="this.no">
      <option v-for="chapter2 in chapters" :value="chapter2.id">
        {{chapter2.id}}. {{chapter2.name_complex}}
      </option>
    </select>
    <button v-on:click="search" class="search btn btn-success">Search</button>
    <button v-on:click="next" class="next btn btn-info">Next</button>
  </div>

<!--  <section>
    <div>
      <h3 v-for="verse in verses" class="text-end" style="color: white;  font-weight: bold">
        {{verse.text_uthmani}} {{verse.verse_key}} <br/><br/>
      </h3>
      <br/>
      <div v-for="translation in translations">
        <p class="text-start" style="color: white; font-size: 20px; font-weight: bold">
          {{translation.text}}
        </p>
      </div>
    </div>
  </section>-->
</template>

<script>
/*import {ref} from "vue";
import axios from "axios";*/
import IconInfo from "./icons/IconInfo.vue";
import Navbar from "./Navbar.vue";
import IconBook from "./icons/IconBook.vue";
export default {
  name: 'Surah',
  components: { IconBook, Navbar, IconInfo },
  data() {
    return {
      no: this.$route.params.no,
      chapter: null,
      verses: [],
      audio_file:null,
      chapters:[],
      translations: [],
      data: [],
      languages: [],
      langCode: this.$route.params.langCode,
      recitations: [],
      reciId: 7,
      transId: 33,
    };
  },
  methods: {
    search() {
      if (this.no >= 115 ||  this.no <= 0) {
        alert("Surat hanya 1 sampai 114")
        this.no = 1;
        this.getVerses();
        this.getChapter();
        this.getAudio();
        this.getTranslation();
        this.getData();
        this.getLanguage();
        this.getRecitation();
      } else {
        this.getVerses();
        this.getChapter()
        this.getAudio();
        this.getTranslation();
        this.getData();
        this.getLanguage();
        this.getRecitation();
      }
    },
    filter() {
      this.getVerses();
      this.getChapter()
      this.getAudio();
      this.getTranslation();
      this.getData();
      this.getLanguage();
      this.getRecitation();
    },
    next() {
      this.no++;
      if (this.no >= 115) {
        alert("Surat hanya 114")
        this.no = 1;
        this.getVerses();
        this.getChapter();
        this.getAudio();
        this.getTranslation();
        this.getData();
        this.getLanguage();
        this.getRecitation();
      } else {
        this.getVerses();
        this.getChapter();
        this.getAudio();
        this.getTranslation();
        this.getData();
        this.getLanguage();
        this.getRecitation();
      }
    },
    prev() {
      this.no--;
      if (this.no <= 0) {
        alert("Surat dimulai dari 1")
        this.no = 114;
        this.getVerses();
        this.getChapter();
        this.getAudio();
        this.getTranslation();
        this.getData();
        this.getLanguage();
        this.getRecitation();
      } else {
        this.getVerses();
        this.getChapter();
        this.getAudio();
        this.getTranslation();
        this.getData();
        this.getLanguage();
        this.getRecitation();
      }
    },
    async getData() {
      switch (this.langCode) {
        case "en":
          this.transId = 131;
          break;
        case "ur":
          this.transId = 234;
          break;
        case "bn":
          this.transId = 161;
          break;
        case "tr":
          this.transId = 210;
          break;
        case "id":
          this.transId = 33;
          break;
        case "es":
          this.transId = 140;
          break;
        case "ml":
          this.transId = 224;
          break;
        case "fr":
          this.transId = 779;
          break;
        case "ja":
          this.transId = 218;
          break;
        case "yo":
          this.transId = 125;
          break;
        default:
          this.transId = 131;
      }
      const ayat = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${this.no}`);
      const dataAyat = await ayat.json();
      const translation = await fetch(`https://api.quran.com/api/v4/quran/translations/${this.transId}?chapter_number=${this.no}`);
      const dataTranslation = await translation.json();
      const audio = await fetch(`https://api.quran.com/api/v4/quran/recitations/${this.reciId}?chapter_number=${this.no}`);
      const dataAudio = await  audio.json();

     /* const tafsir = await fetch(`https://api.quran.com/api/v4/quran/tafsirs/92?chapter_number=${this.no}?verse_key=${key}`);
      const dataTafsir = await tafsir.json();*/
      /*const verseKey= dataAyat.verses[0].verse_key;*/

      const arrayData = dataAyat["verses"].map(function(perAyat, index) {
        return {
          id: perAyat.id,
          textArab: perAyat.text_uthmani,
          key: perAyat.verse_key,
          translate: dataTranslation.translations[index].text,
          audioUrl : dataAudio.audio_files[index].url,

        }
      })
      this.data = arrayData;
      console.log(this.data);

      /*var isiUrl = 0;
      var songs = []
      for (let i = 0; i < this.data.length; i++) {
        songs[i] = `https://verses.quran.com/${dataAudio.audio_files[i].url}`;
        console.log(songs[i]);
      }
      var getIdSongs = document.getElementById("cek");
      getIdSongs.addEventListener('ended', function(){
        document.getElementById("cek").src = songs[isiUrl+1];
        getIdSongs.load();
        getIdSongs.play();
        isiUrl++;
        if (isiUrl >= songs.length) {
          isiUrl = 0;
        }
      })
      console.log(getIdSongs)*/

    },
    async getChapter() {
      fetch("https://api.quran.com/api/v4/chapters/" + this.no + "?language=" + this.langCode, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          this.chapter = json.chapter;
        });
      console.log(this.langCode);
    },
    async getLanguage() {
      fetch("https://api.quran.com/api/v4/resources/languages", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
      .then((json) => {
        this.languages = json.languages;
      })
    },
    async getRecitation(){
      fetch("https://api.quran.com/api/v4/resources/recitations", {
        method: "GET"
      })
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((json) => {
        this.recitations = json.recitations;
      })
    },
    async getChapters() {
      fetch("https://api.quran.com/api/v4/chapters?language=en", {
        method: "GET",
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((json) => {
        this.chapters = json.chapters;
      })
    },
    async getTranslation() {

      fetch("https://api.quran.com/api/v4/quran/translations/174?chapter_number=" + this.no, {
        method: "GET",
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((json) => {
          this.translations = json.translations;
        })
    },
    async getVerses() {
      fetch(
        "https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=" + this.no,
        {
          method: "GET",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((json) => {
          this.verses = json.verses;
        });
    },
    async getAudio() {
      fetch("https://api.quran.com/api/v4/chapter_recitations/" + this.reciId + "/" + this.no, {
        method: "GET",
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        this.audio_file = json.audio_file;
      })
    }
  },
  async getTafsir() {
    fetch(`https://api.quran.com/api/v4/quran/tafsirs/92?chapter_number=${this.no}&verse_key=1%3A1`)
  },
  mounted() {
    this.getChapter();
    this.getVerses();
    this.getAudio();
    this.getChapters();
    this.getTranslation();
    this.getData();
    this.getLanguage();
    this.getRecitation();
  },

}


</script>

<style scoped>
.navbar{
  margin-bottom: 50px ;

}
.content{
  padding-top: 80px;
}
.up-icon{
  position: fixed;
  border-radius: 50%;
  background: rgba(192,192,192,0.3);
  bottom: 40px;
  right: 50px;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
  color:#ffffff;
  -webkit-transform:rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}

.form{
  height: 50px;
  margin-top: 30px;
}
.search{
  opacity: 90%;
  margin-right: 50px;
}
.nav-title{
  color: black;
  padding-top: 10px;
}
.navbar-brand{
  color: black;
}
.offcanvas-title{
  color: black;
  font-size: 20px;
}
.list{
  display: flex;
}
.list-down{
  display: flex;
  margin-top: 50px;
}
.prev{
  margin-right: 50px;
}
.judul{
  float: right;
}
.toTafsir{
  margin-bottom: 50px;
}
.audio{
  margin-bottom: 10px;
}
.bismillah{
  width: 500px;
  height: 250px;
}
@media (max-width: 1000px) {
  .text-end{
    margin-bottom: 30px;
  }
  .toTafsir{
    margin-bottom: 50px;
  }
  .bismillah{
    width: 400px;
    height: 200px;
  }
}
@media (max-width: 670px) {
  .text-end{
    margin-bottom: 30px;
  }
  .toTafsir{
    margin-bottom: 100px;
  }
  .audio-utama{
    width: 250px;
  }
  .form{
  }
  .bismillah{
    width: 300px;
    height: 200px;
    margin-top: 50px;
  }
}

</style>
