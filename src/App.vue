
<template>
  <div id="app">
    <Header
      :selectedItem="selected"
      @on-select="value => selected = value"
    />
  </div>
</template>

<script>
import Header from "@/components/header/index.vue"
// import { PLANETS } from "@/constants/index.js"

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      selected: "mercury",
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss">
// import third party first
@import "https://unpkg.com/element-ui/lib/theme-chalk/index.css";
@import "@/assets/style/element-variables.scss";

// Then only import local, to allow overriding
@import "@/assets/style/main.scss";
</style>