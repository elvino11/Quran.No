<template>

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


  <div class="goback">
    <h5>
      <RouterLink :to="{name: 'surah', params: {no, langCode}}"><IconArrow/> Go back to surah</RouterLink>
    </h5>
  </div>

  <div v-if="chapter" align="center" class="info">
    <h1>Surah {{ chapter.name_simple }}</h1>
    <h2>Ayat <br/> {{chapter.verses_count}} </h2>
    <h3>Tempat Wahyu <br/> {{chapter.revelation_place}}</h3>
  </div>
  <hr/>

  <div v-if="chapter_info" class="isi">
    <div class="isi-gambar" align="center">
      <img src="../assets/info/makkah.jpg" alt="info" id="gambar">
    </div>
    <div v-if="chapter" class="info2">
      <h1>Surah {{ chapter.name_simple }}</h1>
      <h2>Ayat <br/> {{chapter.verses_count}} </h2>
      <h3>Tempat Wahyu <br/> {{chapter.revelation_place}}</h3>
    </div>
    <span class="garis"><hr/></span>
    <div v-html="chapter_info.text" ></div>
  </div>
</template>

<style scoped>
.goback{
  padding-top: 50px;
}
.info{
  display: flex;
  color: white;
}
.info h1, h2{
  padding-right: 300px;
}
.isi{
  color: white;
  font-size: 16px;
}
.isi-gambar{
  float: left;
}
img{
  width: 200px;
  height: 200px;
  margin-right: 30px;
}
.info2{
  display: none;
  margin-top: 30px;
}
.garis{
  display: none;
}
@media (max-width: 1000px) {
  .info{
    display: none;
  }
  .info2{
    display: flex;
  }
  .info2 h1,h2, h3{
    font-size: 25px;
  }
  .isi-gambar{
    float: none;
  }
  #gambar{
    width: 400px;
  }
  .info2 h1, h2{
    padding-right: 200px;
  }
  .garis{
    display: inline;
  }
}
@media (max-width: 670px) {
  .info{
    display: none;
  }
  .isi-gambar{
    float: none;
  }
  #gambar{
    width: 300px;
  }
  .info2{
    display: flex;
  }
  .info2 h1,h2,h3 {
    font-size: 20px;
  }
  .info2 h1, h2{
    padding-right: 100px;
  }
  .garis{
    display: inline;
  }
}

</style>


<script>
import IconArrow from "./icons/IconArrow.vue";
export default {
  name: "Test",
  components: { IconArrow },
  data() {
    return {
      no: this.$route.params.no,
      chapter_info: null,
      chapter: null,
      data: [],
      languages: [],
      langCode: this.$route.params.langCode,
      recitations: [],
      reciId: 7,
    }
  },
  methods: {
    filter() {
      this.getChapter();
      this.getInfoSurah();
      this.getLanguage();
      this.getRecitation();
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
    async getChapter() {
      fetch("https://api.quran.com/api/v4/chapters/" + this.no + "?language=" + this.langCode , {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          this.chapter = json.chapter;
          const cekTempat = json.chapter.revelation_place;

          const images = ["src/assets/info/makkah.jpg", "src/assets/info/madinah.jpg"];

          if (cekTempat === "makkah") {
            document.getElementById("gambar").src = images[0];
          } else {
            document.getElementById("gambar").src = images[1];
          }
          console.log(cekTempat);
          console.log(this.langCode);
        });
         },
    async getInfoSurah() {
      fetch(`https://api.quran.com/api/v4/chapters/${this.no}/info?language=${this.langCode}`, {
        method: "GET",
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((json) => {
          this.chapter_info = json.chapter_info;
        })
    }
  },
  mounted() {
    this.getInfoSurah();
    this.getChapter();
    this.getLanguage();
    this.getRecitation();
  },
}
</script>


