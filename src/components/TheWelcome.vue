
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


  <div class="gambar">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/kaligrafi.png"
        width=""
        height="300"
      />
    <HelloWorld msg="Welcome To Quran.No" />

  </div>
  <div class="list-title">
    <h3>List Surah : </h3>
  </div>

  <div v-for="chapter in chapters" :key="chapter.id" class="surah">
    <div class="kotak" align="center">
      <RouterLink :to="{name: 'surah', params: {no : chapter.id, langCode}}">
        <input type="radio" class="btn-check" :id="chapter.id" autocomplete="off" v-model="no" :value="chapter.id" >
        <label class="btn btn-outline-primary" :for="chapter.id">{{chapter.id}}. {{chapter.name_complex}}
          <br/>{{chapter.translated_name.name}}</label><br>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: { HelloWorld },
  data() {
    return {
      no: '',
      chapters:[],
      languages: [],
      langCode: this.$route.params.langCode,
      recitations: [],
      reciId: 7,
    };
  },

  methods: {
    filter() {
      this.getLanguage();
      this.getRecitation();
      this.getChapter();
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
      fetch("https://api.quran.com/api/v4/chapters?language=" + this.langCode, {
        method: "GET",
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        this.chapters = json.chapters;
      })
    }
  },
  mounted() {
    this.getChapter();
    this.getLanguage();
    this.getRecitation();
  }
}
</script>

<style>
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
.gambar{
  margin-top: 70px;
}
.surah{
  float: left;
  width: 30%;
}
.kotak{
  padding-left: 50px;
}
.list-title{
  padding-top: 30px;
}

.btn{
  color: white;
  width: 300px;
  margin-top: 30px;
}
@media (max-width: 1000px) {
  .surah{
    width: 50%;
  }
}
@media (max-width: 670px) {
  .surah{
    width: 100%;
  }
}
</style>
