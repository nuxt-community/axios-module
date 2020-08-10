<template>
  <div>
    <a href="https://vueschool.io/lessons/the-axios-module?friend=nuxt" target="_blank" class="Promote">
      <img src="/async-data-with-nuxtjs-2x.png" alt="AsyncData Nuxt course by Vue School">
      <div class="Promote__Content">
        <h4 class="Promote__Content__Title">Learn how to use the Axios module with a short video lesson</h4>
        <p class="Promote__Content__Description">Get up to speed quickly with Vue School's free video lesson.</p>
        <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js developpement.</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PromoteBlock'
}
</script>

<style>
.Promote {
  background-color: #edf2f7;
  color: #2f495e;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
  text-decoration: none !important;
}

.Promote:hover {
  background-color: #e2e8f0 !important;
  text-decoration: none !important;
}

.Promote img {
  width: 100%;
  height: auto;
  border-radius: .25rem;
  margin-bottom: .75rem;
  margin-top: 0;
}

.Promote .Promote__Content {
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
  font-weight: 500;
}

.Promote .Promote__Content__Title {
  font-size: 1.25rem;
  color: #2f495e;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 0;
}

.Promote .Promote__Content__Description {
  line-height: 1.625;
  font-size: .875rem;
  color: #606f7b;
}

.Promote .Promote__Content__Signature {
  color: #a0aec0;
  font-size: .75rem;
  margin: 0;
  line-height: 1;
}

@media screen and (min-width: 1020px) {

  .Promote {
    flex-direction: row;
  }

  .Promote .Promote__Content {
    padding-left: 1rem;
  }

  .Promote .Promote__Content__Title {
    margin: 0;
  }

  .Promote img {
    max-width: 240px !important;
    margin-bottom: 0;
  }

}
.dark-mode .Promote {
  background: #2d3041;
}
.dark-mode .Promote .Promote__Content__Description {
  color: #fff;
}
.dark-mode .Promote .Promote__Content__Signature {
  color: #ebebeb;
}
.dark-mode .Promote:hover {
  background: #43485a;
}
</style>
