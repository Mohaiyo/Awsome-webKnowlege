<template>
  <div id="app">
    <div>
      <!-- <chapters-two /> -->
      <!-- <chapters-six /> -->
      <!-- <chapters-seven />
      <chapters-eight /> -->
      <!-- <chapters-ninght /> -->
      <!-- <proxy /> -->
      <!-- <spike /> -->
      <!-- <VuexState /> -->
      <min-vuex />
    </div>
    
  </div>
</template>

<script>
// import chapters from './views/chapters1.1/index'
// import chaptersTwo from './views/chapters1.2/index'
// import chaptersFourth from './views/chapters1.4/index'
// import chaptersFive from './views/chapters1.5/index'
// import chaptersSix from './views/chapters1.6/index'
// import chaptersSeven from './views/chapters1.7/index'
// import chaptersEight from './views/chapters1.8/index'
// import chaptersNinght from './views/chapters1.9/index'
// import Proxy from './views/Proxy/index'
// import VuexState from './views/VuexState/index'
import MinVuex from './views/minVuex/index'
// import Spike from './views/Spike/index'
export default {
  name: 'App',
  components: {
    // chapters,
    // chaptersTwo,
    // chaptersFourth,
    // chaptersFive,
    // chaptersSix
    // chaptersSeven,
    // chaptersEight,
    // chaptersNinght,
    // Proxy
    // Spike,
    // VuexState,
    MinVuex
  },
  data() {
    return {
      type: 'primary'
    }
  },
  methods: {
    changeHandle(type) {
      this.type = type
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}
</style>
