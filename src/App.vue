
<template>
  <div id="app">
    <Header
      :selectedItem="selected"
      @on-select="value => selected = value"
      :isMobile="isMobile"
      :isTablet="isTablet"
    />
    <Content
      :selectedItem="selected"
      :isMobile="isMobile"
      :isTablet="isTablet"
    />
  </div>
</template>

<script>
import Header from "@/components/header.vue"
import Content from "@/components/content.vue"
import debounce from "lodash/debounce"

const TABLET_MAX_WIDTH = 1200
const MOBILE_MAX_WIDTH = 500

export default {
  name: "App",
  components: {
    Header,
    Content
  },
  data() {
    return {
      selected: "mercury",
      isMobile: false,
      isTablet: false,
    }
  },
  computed: {
  },
  mounted() {
    // Mobile view checking
    this.checkIsMobile() // initial checking

    // check isMobile again when resized
    window.addEventListener('resize', 
      debounce(this.checkIsMobile, 100)
    , true);
  },
  methods: {
    checkIsMobile() {
      const width = document.body.clientWidth
      this.isMobile = width < MOBILE_MAX_WIDTH
      this.isTablet = width < TABLET_MAX_WIDTH

      document.body.classList.remove('mobile');
      document.body.classList.remove('tablet');

      if (this.isMobile) {
        document.body.classList.add('mobile');
      } else if (this.isTablet) {
        document.body.classList.add('tablet');
      }
    },
  },
};
</script>

<style lang="scss">
// import third party first
@import "https://unpkg.com/element-ui/lib/theme-chalk/index.css";

// Then only import local, to allow overriding
@import "@/assets/style/main.scss";
</style>