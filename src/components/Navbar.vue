<!--
<template>
  <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> Quran.No</a>
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
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">

              <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="this.langCode">
                <option v-for="language in languages" :value="language.iso_code">
                  <RouterLink :to="{name: 'surah', params:{langCode}}">
                    {{ language.name }}
                  </RouterLink>
                </option>
                <option selected>Language</option>
              </select>
            </li>
          </ul>
&lt;!&ndash;          <form class="d-flex">
            <button class="btn btn-outline-success" type="submit"><RouterLink :to="{name: 'surah', params:{" Search</button>
          </form>&ndash;&gt;
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return{
      languages: [],
      langCode: 'Language'
    }
  },
  methods: {
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
    }
  },
  mounted() {
    this.getLanguage();
  }
};
</script>

<style scoped>
.offcanvas-title{
  color: black;
  font-size: 20px;
}
</style>
-->
