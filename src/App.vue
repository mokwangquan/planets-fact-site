
<template>
  <div id="app">
    <Header
      :selectedItem="selected"
      @on-select="value => selected = value"
    />
    <Content
      :selectedItem="selected"
    />
  </div>
</template>

<script>
import Header from "@/components/header.vue"
import Content from "@/components/content.vue"
// import { PLANETS } from "@/constants/index.js"

export default {
  name: "App",
  components: {
    Header,
    Content
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

// Then only import local, to allow overriding
@import "@/assets/style/main.scss";
</style>