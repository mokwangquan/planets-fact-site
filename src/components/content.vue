<template>
  <Transition name="slide-left-right">
  <div id="component-wrapper" :key="componentKey">
    <div id="content">
      <el-tabs v-if="isMobile" v-model="selectedContent" stretch>
        <el-tab-pane label="OVERVIEW" name="overview">
          <div class="underline" :style="`background-color: ${planet.color}`">&nbsp;</div>
        </el-tab-pane>
        <el-tab-pane label="STRUCTURE" name="internalStructure">
          <div class="underline" :style="`background-color: ${planet.color}; transform: translate(33vw, 0)`">&nbsp;</div>
        </el-tab-pane>
        <el-tab-pane label="SURFACE" name="surfaceGeology">
          <div class="underline" :style="`background-color: ${planet.color}; transform: translate(66vw, 0)`">&nbsp;</div>
        </el-tab-pane>
      </el-tabs>

      <el-row :type="isTablet || isMobile ? '' : 'flex'" justify="center" align="start">
        <el-col class="img-col" :span="isTablet || isMobile ? 24 : 14">
            <div class="img-wrapper">
              <img 
                class="planet-img"
                :src="planetUrl" 
                :alt="planet.value+' image'"
              />
              <el-image
                class="planet-geology-img"
                v-if="selectedContent === 'surfaceGeology'"
                :src="planetGeoUrl" 
                :alt="planet.value+' image_geology'"
                fit="contain"
              />
            </div>
        </el-col>
        <el-col :span="isTablet || isMobile ? 24 : 8">
          <el-row class="content-wrapper" :type="isTablet || isMobile ? 'flex' : ''" justify="space-between" align="middle">
            <el-col :span="isTablet && !isMobile ? 12 : 24">
              <component :is="isMobile ? 'h2' : 'h1'">{{ planet.label }}</component>
              <br/>
              <p>{{ content }}</p>
              <div class="source">
                Source : 
                <a :href="planet.sourceUrl" target="_blank">
                  {{ planet.source }}<i class="go-to-icon"/>
                </a>
              </div>
            </el-col>
            

            <el-col v-if="!isMobile" class="button-wrapper" :span="isTablet ? 10 : 24">
              <el-button 
                :style="`background-color: ${ selectedContent === 'overview' ? planet.color : '' }`"
                @click="selectedContent = 'overview'"
              >
                <span class="number">01</span> <h4>OVERVIEW</h4>
              </el-button>

              <el-button 
                :style="`background-color: ${ selectedContent === 'internalStructure' ? planet.color : '' }`"
                @click="selectedContent = 'internalStructure'"
              >
                <span class="number">02</span> <h4>INTERNAL STRUCTURE</h4>
              </el-button>

              <el-button 
                :style="`background-color: ${ selectedContent === 'surfaceGeology' ? planet.color : '' }`"
                @click="selectedContent = 'surfaceGeology'"
              >
                <span class="number">03</span> <h4>SURFACE GEOLOGY</h4>
              </el-button>
            </el-col>
            
          </el-row>
        </el-col>
      </el-row>
      <el-row class="numeric-facts-row" :type="isMobile ? '' : 'flex'" justify="center" align="start">
        <el-col>
          <div class="fact-box">
            <div class="title">ROTATION TIME</div>
            <h2 class="answer">{{ planet.rotationTime }}</h2>
          </div>
        </el-col>
        <el-col>
          <div class="fact-box">
            <div class="title">REVOLUTION TIME</div>
            <h2 class="answer">{{ planet.revolutionTime }}</h2>
          </div>
        </el-col>
        <el-col>
          <div class="fact-box">
            <div class="title">RADIUS</div>
            <h2 class="answer">{{ planet.radius }}</h2>
          </div>
        </el-col>
        <el-col>
          <div class="fact-box">
            <div class="title">AVERAGE TEMP.</div>
            <h2 class="answer">{{ planet.temp }}</h2>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
  </Transition>
</template>

<script>
import { PLANETS } from "@/constants/index.js"

export default {
  name: "Content",
  props: {
    selectedItem: { type: String, required: true },
    isMobile: { type: Boolean, required: true },
    isTablet: { type: Boolean, required: true },
  },
  data() {
    return {
      selectedContent: 'overview',
      componentKey: 0,
    }
  },
  computed: {
    planet() {
      return PLANETS.find(el => el.value == this.selectedItem)
    },
    planetUrl() {
      let additional = ""
      if (this.selectedContent == "internalStructure") additional = "-internal"
      
      return require(`@/assets/svgs/planet-${this.planet.value}${additional}.svg`)
    },
    planetGeoUrl() {
      return require(`@/assets/pngs/geology-${this.planet.value}.png`)
    },
    content() {
      return this.planet[this.selectedContent]
    },
  },
  watch: {
    selectedItem() {
      this.selectedContent = 'overview'
      this.componentKey++
    }
  }
}
</script>



<style lang="scss">
#component-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);
  width: 100vw;
  position: absolute;
  top: 80px; // header
  #content {
    height: fit-content;
    >.el-row {
      margin-top: 5rem;
      margin-bottom: 3rem;
      height: fit-content;
    }
    .content-wrapper {
      margin-right: 10vw;
      height: 35rem;
      >.el-col:last-child {
        position: absolute;
        bottom: 0;
      }
    }
    .img-wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      text-align: center;
    }
    .planet-img {
      max-height: 33rem;
    }
    .planet-geology-img {
      position: absolute;
      top: 65%;
      left: calc(50% - 65px);
      width: 130px;
    }
    a {
      color: #838391;
      font-weight: bold;
      text-decoration: underline;
      .go-to-icon {
        height: 15px;
        width: 15px;
        background-size: 15px 15px;
        background-position: center;
        background-repeat: no-repeat;
        display: inline-block;
        background-image: url('../assets/svgs/icon-source.svg');
        position: relative;
        bottom: -3px;
        left: 5px;
      }
    }
    .source {
      margin: 2rem 0
    }
    .button-wrapper {
      .el-button {
        width: 100%;
        padding: 0.5rem;
        color: #FFFFFF;
        border-radius: 0;
        margin: 0.5rem 0;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        text-align: start;
        * {
          display: inline;
        }
        .number {
          float: left;
          margin: auto 20px;
          padding: 5px;
        }
        &:hover {
          background-color: #38384F;
        }
      }
    }

    .numeric-facts-row {
      margin: 2rem 10rem;
      .fact-box {
        padding: 1rem;
        margin: auto 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        .title {
          color: #838391;
        }
      }
    }
  }
}

.mobile #component-wrapper,
.tablet #component-wrapper {
  display: block;
}

.tablet #component-wrapper #content,
.mobile #component-wrapper #content {
  margin-top: 60px;
  >.el-row {
    margin-top: 0;
    margin-bottom: 0;
  }
  .content-wrapper {
    margin: 0 2rem;
    height: auto;
    >.el-col:last-child {
      position: relative;
    }
  }
  .img-wrapper {
    height: 25rem;
    margin-bottom: 0;
  }
  .planet-img {
    transform-origin: 50% 40%;
    -moz-transform:scale(0.7);
    -webkit-transform:scale(0.7);
    transform:scale(0.7);
  }
  .numeric-facts-row {
    margin: 1rem;
    .title {
      font-size: 10px;
      line-height: 20px;
    }
    .answer {
      font-size: 20px;
      line-height: 26px;
      letter-spacing: 0px;
    }
  }
}

.mobile #component-wrapper #content {
  margin-top: 0px;
  .el-tabs {
    z-index: 1;
    position: sticky;
    top: 5rem;
    padding-top: 1rem;
    background-color: #070724;

    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav.is-top {
      .el-tabs__item {
        padding: 0 20px;
        font-family: "SpartanRegular";
        font-size: 14px;
        line-height: 35px;
        color: #FFFFFF;
        font-weight: bold;
      }
    }

    .el-tabs__active-bar,
    .el-tabs__nav-wrap::after {
      display: none; // i do it myself
    }
    .underline {
      width: calc(33.33% - 40px);
      height: 2px;
      margin: 0 20px;
    }
  }
  .img-col {
    height: 23rem;
  }
  .planet-img {
    transform-origin: 50% 40%;
    -moz-transform:scale(0.6);
    -webkit-transform:scale(0.6);
    transform:scale(0.6);
  }
  .content-wrapper {
    >div {
      transform-origin: 50% 0%;
      text-align: center;
      -moz-transform: scale(0.9);
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
      .source {
        margin-top: 1rem;
        margin-bottom: 0rem;
      }
    }
  }
  .fact-box {
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    transform-origin: 50% 0%;
    -moz-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    .title {
      display: inline;
    }
    .answer {
      float: right;
    }
  }
  .planet-geology-img {
    transform: rotate(-90deg) translate(100%, 50%);
  }
}

// transition
.slide-left-right-leave-active,
.slide-left-right-enter-active {
  transition: 0.5s ease, opacity 0.2s ease;
}
.slide-left-right-enter {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-left-right-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}

.slide-left-right-enter-to,
.slide-left-right-leave-to {
  position: absolute;
}

</style>